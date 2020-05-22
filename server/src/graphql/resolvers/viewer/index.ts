import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { Database, Viewer, User } from "../../../lib/types";
import { LoginArgs, SignUpArgs } from "./types";
import { ObjectID } from "mongodb";
import { authenticate } from "../../../lib/utils";

const generateToken = (id: string): string => {
  const secret = String(process.env.JWT_SECRET_KEY);
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const viewerResolvers = {
  Query: {
    getLoginUser: async (
      _root: undefined,
      {},
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      try {
        const user = await authenticate(db, req);
        return user;
      } catch (error) {
        throw new Error("Invalid token");
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
        if (!viewer) throw new Error("User not found");

        // check viewer input password if match into found viewer
        const isMatch = await bcrypt.compare(password, viewer.password);
        if (!isMatch) throw new Error("Email or password is incorrect");

        // generate token
        const token = generateToken(viewer._id);

        return {
          _id: viewer._id,
          token,
          walletId: viewer.walletId,
        };
      } catch (error) {
        throw new Error(error);
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
        const token = generateToken(viewer._id);

        return {
          _id: viewer._id,
          token,
          walletId: viewer.walletId,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Viewer: {
    id: (viewer: Viewer): string => viewer._id.toString(),
  },
};
