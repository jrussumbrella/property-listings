import { listingResolvers } from "./listing";
import { userResolvers } from "./user";
import { viewerResolvers } from "./viewer";
import { favoritesResolvers } from "./favorites";

export const resolvers = [
  listingResolvers,
  userResolvers,
  viewerResolvers,
  favoritesResolvers,
];
