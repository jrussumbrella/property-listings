import { Database, User } from "../../../lib/types";
import { UserArgs, UserListingsArgs, UserListingsData } from "./types";

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
    listings: async (
      user: User,
      { limit, page }: UserListingsArgs,
      { db }: { db: Database }
    ): Promise<UserListingsData> => {
      const skips = page > 0 ? (page - 1) * limit : 0;

      let listings = db.listings
        .find({ host: user._id })
        .skip(skips)
        .limit(limit);

      const data: UserListingsData = {
        total: 0,
        result: [],
      };

      data.total = await listings.count();
      data.result = await listings.toArray();

      return data;
    },
  },
};
