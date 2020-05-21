import { Database, Listing, User } from "../../../lib/types";
import { ObjectID } from "mongodb";
import { UserArgs } from "./types";

export const userResolvers = {
  Query: {
    host: async (
      _root: undefined,
      { id }: UserArgs,
      { db }: { db: Database }
    ): Promise<User> => {
      try {
        const host = await db.users.findOne({ _id: id });
        if (!host) throw new Error("Host not found");
        return host;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  User: {
    id: (user: User): string => user._id.toString(),
  },
};
