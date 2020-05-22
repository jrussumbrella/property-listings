import { listingResolvers } from "./listing";
import { userResolvers } from "./user";
import { viewerResolvers } from "./viewer";

export const resolvers = [listingResolvers, userResolvers, viewerResolvers];
