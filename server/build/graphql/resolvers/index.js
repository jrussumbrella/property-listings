"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const listing_1 = require("./listing");
const user_1 = require("./user");
const viewer_1 = require("./viewer");
const favorites_1 = require("./favorites");
exports.resolvers = [
    listing_1.listingResolvers,
    user_1.userResolvers,
    viewer_1.viewerResolvers,
    favorites_1.favoritesResolvers,
];
