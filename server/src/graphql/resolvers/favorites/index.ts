import { Database, Listing, User } from "../../../lib/types";
import { Request } from "express";
import { ToggleFavoriteArgs } from "./types";
import { ObjectID } from "mongodb";
import { authenticate } from "../../../lib/utils";

export const favoritesResolvers = {
  Mutation: {
    toggleFavorite: async (
      _root: undefined,
      { id }: ToggleFavoriteArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      try {
        const user = await authenticate(db, req);
        if (!user) throw new Error("Ops make sure you login first");
        const listing = await db.listings.findOne({ _id: new ObjectID(id) });
        if (!listing) throw new Error(`Listing not found`);

        const isFavorite = user.favorites.some(
          (favorite) => favorite.toString() === id
        );

        if (isFavorite) {
          // remove listing to users' favorite
          const removeFaveResult = await db.users.findOneAndUpdate(
            { _id: user._id },
            {
              $pull: { favorites: listing._id },
            }
          );
          if (!removeFaveResult.value)
            throw new Error("Failed to remove to favorites");
        } else {
          // add listing to user's favorites array
          const insertFaveResult = await db.users.findOneAndUpdate(
            { _id: user._id },
            {
              $addToSet: { favorites: listing._id },
            }
          );

          if (!insertFaveResult.value)
            throw new Error("Failed to add to favorites");
        }

        listing.isFavorite = !isFavorite;

        return listing;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
