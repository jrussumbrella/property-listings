import { Database, User } from '../../../types';
import {
  UserArgs,
  UserListingsArgs,
  UserListingsData,
  UserFavoritesArgs,
  UserFavoritesData,
} from './types';
import { authenticate } from '../../../lib/utils';
import { Request } from 'express';
import { ObjectID } from 'mongodb';

export const userResolvers = {
  Query: {
    host: async (
      _root: undefined,
      { id }: UserArgs,
      { db }: { db: Database }
    ): Promise<User> => {
      try {
        const host = await db.users.findOne({ _id: id });
        if (!host) throw new Error('Host not found');
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
    favorites: async (
      user: User,
      { limit, page }: UserFavoritesArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<UserFavoritesData> => {
      const data: UserFavoritesData = {
        total: 0,
        result: [],
      };
      // if viewer is not login, return empty data
      const viewer = await authenticate(db, req);
      if (!viewer) return data;

      const skips = page > 0 ? (page - 1) * limit : 0;

      const favorites = await db.favorites.find({ userId: user._id }).toArray();

      if (favorites.length === 0) {
        return data;
      }

      const listingsId = favorites.map(
        (favorite) => new ObjectID(favorite.listingId)
      );

      let listings = db.listings
        .find({ _id: { $in: listingsId } })
        .skip(skips)
        .limit(limit);

      data.total = await listings.count();
      data.result = await listings.toArray();

      return data;
    },
  },
};
