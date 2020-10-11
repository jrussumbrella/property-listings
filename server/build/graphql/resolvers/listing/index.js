"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingResolvers = void 0;
const types_1 = require("../../../types");
const mongodb_1 = require("mongodb");
const utils_1 = require("../../../lib/utils");
const api_1 = require("./../../../lib/api");
const email_1 = require("../../../lib/api/email");
const validateListingInput = ({ title, description, price, propertySize, numOfBaths, numOfBedrooms, numOfGuests, type, }) => {
    if (title.length > 100)
        throw new Error('Title must be under 100 characters');
    if (description.length > 5000)
        throw new Error('Description must be under 5000 characters');
    if (type !== types_1.ListingType.Apartment && type !== types_1.ListingType.House)
        throw new Error('Type must be house or apartment');
    if (price < 0)
        throw new Error('Price must be greater than zero');
    if (propertySize === 0)
        throw new Error('Property size cannot be empty');
    if (String(numOfBaths).length === 0)
        throw new Error('Number of baths cannot be empty');
    if (String(numOfBedrooms).length === 0)
        throw new Error('Number of bed rooms cannot be empty');
    if (String(numOfGuests).length === 0)
        throw new Error('Number of guests cannot be empty');
};
exports.listingResolvers = {
    Query: {
        listings: (_root, { page, limit, location, filter }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const query = {};
                const data = {
                    total: 0,
                    result: [],
                };
                //filter by location
                if (location) {
                    const { country, city, admin } = yield api_1.Google.geocode(location);
                    if (city)
                        query.city = city;
                    if (admin)
                        query.admin = admin;
                    if (country)
                        query.country = country;
                }
                // filter by min and max price
                if (filter === null || filter === void 0 ? void 0 : filter.price) {
                    query.price = { $gte: filter.price.min, $lte: filter.price.max };
                }
                // filter by type in array
                if (filter === null || filter === void 0 ? void 0 : filter.type) {
                    query.type = { $in: filter.type };
                }
                if (filter === null || filter === void 0 ? void 0 : filter.transactionType) {
                    query.transactionType = { $in: filter.transactionType };
                }
                let cursor = db.listings.find(query);
                if (filter === null || filter === void 0 ? void 0 : filter.price) {
                    cursor = cursor.sort({ price: 1 });
                }
                const skips = page > 0 ? (page - 1) * limit : 0;
                cursor = cursor.skip(skips).limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(error);
            }
        }),
        listing: (_root, { id }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const listing = yield db.listings.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!listing)
                throw new Error('Listing not found');
            return listing;
        }),
    },
    Mutation: {
        createListing: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { title, description, image, type, numOfGuests, numOfBaths, numOfBedrooms, price, propertySize, address, transactionType, } = input;
            // perform validation to input
            validateListingInput(input);
            const viewer = yield utils_1.authenticate(db, req);
            if (!viewer)
                throw new Error('User cannot be found');
            if (!viewer.isEmailVerified)
                throw new Error('Please confirm your email address first.');
            const { city, admin, country } = yield api_1.Google.geocode(input.address);
            if (!city || !admin || !country)
                throw new Error('Invalid input address');
            const imageUrl = yield api_1.Cloudinary.upload(image);
            const insertResult = yield db.listings.insertOne({
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
            const listing = insertResult.ops[0];
            return listing;
        }),
        emailAgentListing: (_root, { input }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // find listing by id
                const listing = yield db.listings.findOne({
                    _id: new mongodb_1.ObjectId(input.listingId),
                });
                if (!listing)
                    throw new Error('Listing not found');
                const host = yield db.users.findOne({ _id: listing.host });
                if (!host)
                    throw new Error('Agent not found');
                const url = `${process.env.CLIENT_URL}/listing/${listing._id}`;
                // send email host of listing
                yield email_1.sendEmail({
                    name: input.name,
                    template: 'email-host-listing',
                    subject: 'Inquire for Property',
                    from: input.email,
                    to: host === null || host === void 0 ? void 0 : host.email,
                    url,
                    message: input.message,
                    options: { imageUrl: listing.imageUrl, title: listing.title },
                });
                return listing;
            }
            catch (error) {
                throw new Error(error);
            }
        }),
    },
    Listing: {
        id: (listing) => listing._id.toString(),
        favorites: (listing, {}, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const results = yield db.favorites
                .find({ listingId: listing._id.toString() })
                .toArray();
            const favorites = results.map((favorite) => {
                return favorite.userId;
            });
            return favorites;
        }),
        host: (listing, {}, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield db.users.findOne({ _id: listing.host });
            if (!user)
                throw new Error('Host not found');
            return user;
        }),
    },
};
