import { gql } from "apollo-server";

export const typeDefs = gql`
  enum ListingType {
    APARTMENT
    HOUSE
  }

  type Listings {
    total: Int!
    result: [Listing]!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    address: String!
    country: String!
    city: String!
    admin: String!
    numOfBedrooms: Int!
    numOfBaths: Int!
    propertySize: Int!
    numOfGuests: Int!
    rating: Int
    price: Int!
    host: User!
    isFavorite: Boolean
    type: ListingType
  }

  type Favorites {
    total: Int!
    result: [Listing!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    photoUrl: String
    isEmailVerified: Boolean!
    listings(limit: Int!, page: Int!): Listings!
    favorites(limit: Int!, page: Int!): Favorites!
  }

  type Viewer {
    token: String!
    user: User!
    hasWallet: Boolean!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input CreateListingInput {
    title: String!
    description: String!
    image: String!
    type: ListingType!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBaths: Int!
    numOfBedrooms: Int!
    propertySize: String!
  }

  input EmailAgentListingInput {
    name: String!
    email: String!
    phone: String!
    message: String!
    listingId: ID!
  }

  type Query {
    listings(page: Int!, limit: Int!): Listings!
    listing(id: ID!): Listing!
    host(id: ID!): User!
    me: User!
  }

  type Mutation {
    signUp(input: SignUpInput): Viewer!
    login(input: LoginInput!): Viewer!
    emailTokenVerification(token: String!): Viewer!
    toggleFavorite(id: ID!): Listing!
    createListing(input: CreateListingInput!): Listing!
    emailAgentListing(input: EmailAgentListingInput!): Listing!
  }
`;
