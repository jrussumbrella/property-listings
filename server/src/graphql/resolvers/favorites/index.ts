import { Database } from '../../../types';
import { Request } from 'express';
import { ToggleFavoriteArgs } from './types';
import { ObjectID } from 'mongodb';
import { authenticate } from '../../../lib/utils';

export const favoritesResolvers = {
  Mutation: {
    toggleFavorite: async (
      _root: undefined,
      { id }: ToggleFavoriteArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      const user = await authenticate(db, req);
      if (!user) throw new Error('Ops make sure you login first');
      const listing = await db.listings.findOne({ _id: new ObjectID(id) });

      if (!listing) throw new Error(`Listing not found`);

      const isFavorite = await db.favorites.findOne({
        listingId: listing._id.toString(),
        userId: user._id,
      });

      if (isFavorite) {
        const removeFaveResult = await db.favorites.findOneAndDelete({
          listingId: listing._id.toString(),
          userId: user._id,
        });
        if (!removeFaveResult.value)
          throw new Error('Failed to remove to favorites');
      } else {
        // add listing to user's favorites array
        const insertFaveResult = await db.favorites.insertOne({
          _id: new ObjectID(),
          listingId: listing._id.toString(),
          userId: user._id,
        });
        if (!insertFaveResult.result.ok)
          throw new Error('Failed to add to favorites');
      }
      return listing;
    },
  },
};
