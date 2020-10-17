import {
  Database,
  Listing,
  User,
  ListingType,
  TransactionType,
} from '../../../types';
import {
  ListingsData,
  ListingsArgs,
  ListingArgs,
  CreateListingArgs,
  CreateListingInput,
  EmailAgentListingArgs,
  ListingsQuery,
} from './types';
import { ObjectId } from 'mongodb';
import { authenticate } from '../../../lib/utils';
import { Request } from 'express';
import { Google, Cloudinary } from './../../../lib/api';
import { sendEmail } from '../../../lib/api/email';

const validateListingInput = ({
  title,
  description,
  price,
  propertySize,
  numOfBaths,
  numOfBedrooms,
  numOfGuests,
  type,
}: CreateListingInput) => {
  if (title.length > 100) throw new Error('Title must be under 100 characters');
  if (description.length > 5000)
    throw new Error('Description must be under 5000 characters');
  if (type !== ListingType.Apartment && type !== ListingType.House)
    throw new Error('Type must be house or apartment');
  if (price < 0) throw new Error('Price must be greater than zero');
  if (propertySize === 0) throw new Error('Property size cannot be empty');
  if (String(numOfBaths).length === 0)
    throw new Error('Number of baths cannot be empty');
  if (String(numOfBedrooms).length === 0)
    throw new Error('Number of bed rooms cannot be empty');
  if (String(numOfGuests).length === 0)
    throw new Error('Number of guests cannot be empty');
};

export const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      { page, limit, location, filter }: ListingsArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<ListingsData> => {
      try {
        const query: ListingsQuery = {};

        const data: ListingsData = {
          total: 0,
          result: [],
        };

        //filter by location
        if (location) {
          const { country, city, admin } = await Google.geocode(location);

          if (city) query.city = city;
          if (admin) query.admin = admin;

          if (country) query.country = country;
        }

        // filter by min and max price
        if (filter?.price) {
          query.price = { $gte: filter.price.min, $lte: filter.price.max };
        }

        // filter by type in array
        if (filter?.type) {
          query.type = { $in: filter.type };
        }

        if (filter?.transactionType) {
          query.transactionType = { $in: filter.transactionType };
        }

        query.verified = true;

        let cursor = db.listings.find(query);

        if (filter?.price) {
          cursor = cursor.sort({ price: 1 });
        }

        const skips = page > 0 ? (page - 1) * limit : 0;
        cursor = cursor.skip(skips).limit(limit);
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
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ _id: new ObjectId(id) });
      if (!listing) throw new Error('Listing not found');

      return listing;
    },
  },
  Mutation: {
    createListing: async (
      _root: undefined,
      { input }: CreateListingArgs,
      { db, req }: { db: Database; req: Request }
    ) => {
      const {
        title,
        description,
        image,
        type,
        numOfGuests,
        numOfBaths,
        numOfBedrooms,
        price,
        propertySize,
        address,
        transactionType,
      } = input;

      // perform validation to input
      validateListingInput(input);
      const viewer = await authenticate(db, req);
      if (!viewer) throw new Error('User cannot be found');
      if (!viewer.isEmailVerified)
        throw new Error('Please confirm your email address first.');

      const { city, admin, country } = await Google.geocode(input.address);
      if (!city || !admin || !country) throw new Error('Invalid input address');

      const imageUrl = await Cloudinary.upload(image);

      const insertResult = await db.listings.insertOne({
        transactionType,
        title,
        description,
        imageUrl,
        price,
        type,
        numOfGuests,
        propertySize,
        numOfBedrooms,
        numOfBaths,
        address,
        country,
        admin,
        city,
        host: viewer._id,
        verified: false,
      });

      const listing: Listing = insertResult.ops[0];
      return listing;
    },
    emailAgentListing: async (
      _root: undefined,
      { input }: EmailAgentListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        // find listing by id
        const listing = await db.listings.findOne({
          _id: new ObjectId(input.listingId),
        });
        if (!listing) throw new Error('Listing not found');

        const host = await db.users.findOne({ _id: listing.host });
        if (!host) throw new Error('Agent not found');

        const url = `${process.env.CLIENT_URL}/listing/${listing._id}`;

        // send email host of listing
        await sendEmail({
          name: input.name,
          template: 'email-host-listing',
          subject: 'Inquire for Property',
          from: input.email,
          to: host?.email,
          url,
          message: input.message,
          options: { imageUrl: listing.imageUrl, title: listing.title },
        });

        return listing;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
    favorites: async (listing: Listing, {}, { db }: { db: Database }) => {
      const results = await db.favorites
        .find({ listingId: listing._id.toString() })
        .toArray();
      const favorites = results.map((favorite) => {
        return favorite.userId;
      });
      return favorites;
    },
    host: async (
      listing: Listing,
      {},
      { db }: { db: Database }
    ): Promise<User> => {
      const user = await db.users.findOne({ _id: listing.host });
      if (!user) throw new Error('Host not found');
      return user;
    },
  },
};
