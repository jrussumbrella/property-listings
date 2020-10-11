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
exports.favoritesResolvers = void 0;
const mongodb_1 = require("mongodb");
const utils_1 = require("../../../lib/utils");
exports.favoritesResolvers = {
    Mutation: {
        toggleFavorite: (_root, { id }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield utils_1.authenticate(db, req);
            if (!user)
                throw new Error('Ops make sure you login first');
            const listing = yield db.listings.findOne({ _id: new mongodb_1.ObjectID(id) });
            if (!listing)
                throw new Error(`Listing not found`);
            const isFavorite = yield db.favorites.findOne({
                listingId: listing._id.toString(),
                userId: user._id,
            });
            if (isFavorite) {
                const removeFaveResult = yield db.favorites.findOneAndDelete({
                    listingId: listing._id.toString(),
                    userId: user._id,
                });
                if (!removeFaveResult.value)
                    throw new Error('Failed to remove to favorites');
            }
            else {
                // add listing to user's favorites array
                const insertFaveResult = yield db.favorites.insertOne({
                    _id: new mongodb_1.ObjectID(),
                    listingId: listing._id.toString(),
                    userId: user._id,
                });
                if (!insertFaveResult.result.ok)
                    throw new Error('Failed to add to favorites');
            }
            return listing;
        }),
    },
};
