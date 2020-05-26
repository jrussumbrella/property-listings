import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { Request } from "express";
import { Database, Viewer, User } from "../../../lib/types";
import { LoginArgs, SignUpArgs } from "./types";
import { ObjectID } from "mongodb";
import { authenticate } from "../../../lib/utils";
import { sendEmail } from "../../../lib/api/email";

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
          income: 0,
          _id: new ObjectID().toString(),
        });

        const viewer = insertRes.ops[0];

        // generate token
        const token = generateToken(viewer._id, "7d");

        const verifyToken = generateToken(viewer._id, "1d");

        const url = `http://localhost:3000/verify-email/${verifyToken}`;

        await sendEmail(
          viewer,
          "email-confirmation",
          "Welcome to Property Listings",
          url
        );

        return {
          user: viewer,
          token,
          walletId: viewer.walletId,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  Viewer: {
    hasWallet: (viewer: Viewer): boolean => (viewer.walletId ? true : false),
  },
};
