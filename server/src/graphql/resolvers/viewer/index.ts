import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { v4 } from "uuid";
import { Database, Viewer, User } from "../../../lib/types";
import { LoginArgs, SignUpArgs } from "./types";
import { ObjectID } from "mongodb";
import { authenticate } from "../../../lib/utils";
import { sendEmail } from "../../../lib/api/email";
import { redis } from "../../../lib";

const generateToken = (id: string, expiresIn: string): string => {
  const secret = String(process.env.JWT_SECRET_KEY);
  return jwt.sign({ id }, secret, { expiresIn: expiresIn });
};

export const viewerResolvers = {
  Query: {
    me: async (
      _root: undefined,
      {},
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      try {
        const user = await authenticate(db, req);
        if (!user) throw new Error("Invalid token");
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    login: async (
      _root: undefined,
      { input }: LoginArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      try {
        const { email, password } = input;

        const viewer = await db.users.findOne({ email });
        if (!viewer) throw new Error("Email or password is incorrect");

        // check viewer input password if match into found viewer
        const isMatch = await bcrypt.compare(password, viewer.password);
        if (!isMatch) throw new Error("Email or password is incorrect");

        // generate token
        const token = generateToken(viewer._id, "7d");

        return {
          user: viewer,
          token,
          walletId: viewer.walletId,
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    signUp: async (
      _root: undefined,
      { input }: SignUpArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      try {
        const { email, name, password } = input;
        // check if email is already taken
        const checkEmailExists = await db.users.findOne({ email });
        if (checkEmailExists) throw new Error("Email is already taken");

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        // inser user to db
        const insertRes = await db.users.insertOne({
          name,
          email,
          password: encryptPassword,
          bookings: [],
          listings: [],
          favorites: [],
          income: 0,
          _id: new ObjectID().toString(),
          isEmailVerified: false,
        });

        const viewer = insertRes.ops[0];

        // generate access token
        const token = generateToken(viewer._id, "7d");

        const emailVerifyToken = v4();

        // save email verify token to redis
        await redis.set(emailVerifyToken, viewer._id, "ex", 60 * 60 * 24); // set 1 day expiration

        const url = `${process.env.CLIENT_URL}/email-confirmation/${emailVerifyToken}`;

        await sendEmail({
          name: viewer.name,
          from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
          to: viewer.email,
          template: "email-confirmation",
          subject: "Welcome to Property Listings",
          url,
          message: "Thanks for creating an account",
        });

        return {
          user: viewer,
          token,
          walletId: viewer.walletId,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    emailTokenVerification: async (
      _root: undefined,
      { token }: { token: string },
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const userId = await redis.get(token);
      if (!userId) throw new Error(`Invalid token/ Token expired.`);

      const updateResult = await db.users.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            isEmailVerified: true,
          },
        },
        {
          returnOriginal: false,
        }
      );

      const viewer = updateResult.value;

      if (!viewer) throw new Error(`Error in validating email address.`);

      // delete token in redis
      await redis.del(token);

      const userToken = generateToken(viewer._id, "7d");

      return {
        user: viewer,
        token: userToken,
        walletId: viewer.walletId,
      };
    },
  },
  Viewer: {
    hasWallet: (viewer: Viewer): boolean => (viewer.walletId ? true : false),
  },
};
