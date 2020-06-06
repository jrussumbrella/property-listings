import { Database, Listing, User } from "../../../lib/types";
import { ListingsData, ListingsArgs, ListingArgs } from "./types";
import { ObjectId } from "mongodb";
import { authenticate } from "../../../lib/utils";
import { Request } from "express";

export const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      { page, limit }: ListingsArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          total: 0,
          result: [],
        };
        const skips = page > 0 ? (page - 1) * limit : 0;
        const cursor = db.listings.find({}).skip(skips).limit(limit);
        data.total = await cursor.count();

        const listingsArray = await cursor.toArray();

        const viewer = await authenticate(db, req);
        if (!viewer) {
          data.result = listingsArray.map((listing) => ({
            ...listing,
            isFavorite: false,
          }));
          return data;
        }

        const listingsResult = listingsArray.map((listing) => {
          const isFavorite = viewer.favorites.some(
            (listingId) => listingId.toString() === listing._id.toString()
          );

          if (isFavorite) {
            return {
              ...listing,
              isFavorite: true,
            };
          } else {
            return {
              ...listing,
              isFavorite: false,
            };
          }
        });

        data.result = listingsResult;

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });
        if (!listing) throw new Error("Listing not found");
        const viewer = await authenticate(db, req);

        if (!viewer) {
          listing.isFavorite = false;
          return listing;
        }

        let isFavorite = viewer.favorites.some(
          (listingId) => listingId.toString() === listing._id.toString()
        );

        listing.isFavorite = isFavorite;
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
