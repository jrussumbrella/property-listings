import { Database, Listing } from "../../../lib/types";
import { ListingsData } from "./types";

export const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      {},
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          total: 0,
          result: [],
        };
        const listings = await db.listings.find({}).toArray();

        data.total = listings.length;
        data.result = listings;
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
