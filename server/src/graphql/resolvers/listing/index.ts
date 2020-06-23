import { Database, Listing, User, ListingType } from "../../../lib/types";
import {
  ListingsData,
  ListingsArgs,
  ListingArgs,
  CreateListingArgs,
  CreateListingInput,
} from "./types";
import { ObjectId } from "mongodb";
import { authenticate } from "../../../lib/utils";
import { Request } from "express";
import { Google, Cloudinary } from "./../../../lib/api";

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
  if (title.length > 100) throw new Error("Title must be under 100 characters");
  if (description.length > 5000)
    throw new Error("Description must be under 5000 characters");
  if (type !== ListingType.Apartment && type !== ListingType.House)
    throw new Error("Type must be house or apartment");
  if (price < 0) throw new Error("Price must be greater than zero");
  if (propertySize.length === 0)
    throw new Error("Property size cannot be empty");
  if (String(numOfBaths).length === 0)
    throw new Error("Number of baths cannot be empty");
  if (String(numOfBedrooms).length === 0)
    throw new Error("Number of bed rooms cannot be empty");
  if (String(numOfGuests).length === 0)
    throw new Error("Number of guests cannot be empty");
};

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
      } = input;

      // perform validation to input
      validateListingInput(input);
      const viewer = await authenticate(db, req);
      if (!viewer) throw new Error("User cannot be found");

      const { city, admin, country } = await Google.geocode(input.address);
      if (!city || !admin || !country) throw new Error("Invalid input address");

      const imageUrl = await Cloudinary.upload(image);

      const insertResult = await db.listings.insertOne({
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
      });

      const listing: Listing = insertResult.ops[0];
      return listing;
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
