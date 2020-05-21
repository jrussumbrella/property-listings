import { Database, Listing, User } from "../../../lib/types";
import { ListingsData, ListingsArgs, ListingArgs } from "./types";
import { ObjectID } from "mongodb";

export const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      { page, limit }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          total: 0,
          result: [],
        };
        const skips = page > 0 ? (page - 1) * limit : 0;
        const cursor = db.listings.find({}).skip(skips).limit(limit);
        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db }: { db: Database }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectID(id) });
        if (!listing) throw new Error("Listing not found");
        return listing;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
    host: async (
      listing: Listing,
      {},
      { db }: { db: Database }
    ): Promise<User> => {
      const user = await db.users.findOne({ _id: listing.host });
      if (!user) throw new Error("Host not found");
      return user;
    },
  },
};
