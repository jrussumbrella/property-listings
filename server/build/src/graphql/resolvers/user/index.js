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
exports.userResolvers = void 0;
const utils_1 = require("../../../lib/utils");
const mongodb_1 = require("mongodb");
exports.userResolvers = {
    Query: {
        host: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const host = yield db.users.findOne({ _id: id });
                if (!host)
                    throw new Error('Host not found');
                return host;
            }
            catch (error) {
                throw new Error(error);
            }
        }),
    },
    User: {
        id: (user) => user._id.toString(),
        listings: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const skips = page > 0 ? (page - 1) * limit : 0;
            let listings = db.listings
                .find({ host: user._id })
                .skip(skips)
                .limit(limit);
            const data = {
                total: 0,
                result: [],
            };
            data.total = yield listings.count();
            data.result = yield listings.toArray();
            return data;
        }),
        favorites: (user, { limit, page }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                total: 0,
                result: [],
            };
            // if viewer is not login, return empty data
            const viewer = yield utils_1.authenticate(db, req);
            if (!viewer)
                return data;
            const skips = page > 0 ? (page - 1) * limit : 0;
            const favorites = yield db.favorites.find({ userId: user._id }).toArray();
            if (favorites.length === 0) {
                return data;
            }
            const listingsId = favorites.map((favorite) => new mongodb_1.ObjectID(favorite.listingId));
            let listings = db.listings
                .find({ _id: { $in: listingsId } })
                .skip(skips)
                .limit(limit);
            data.total = yield listings.count();
            data.result = yield listings.toArray();
            return data;
        }),
    },
};
