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
    numOfGuests: Int!
    rating: Int
    price: Int!
    host: User!
    type: ListingType
  }

  type User {
    id: ID!
    name: String!
    email: String!
    photoUrl: String
    listings(limit: Int!, page: Int!): Listings!
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

  type Query {
    listings(page: Int!, limit: Int!): Listings!
    listing(id: ID!): Listing!
    host(id: ID!): User!
    me: User!
  }

  type Mutation {
    signUp(input: SignUpInput): Viewer!
    login(input: LoginInput!): Viewer!
    emailTokenVerification(token: String!): String!
  }
`;
