import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum ListingType {
    APARTMENT
    HOUSE
  }

  enum TransactionType {
    BUY
    RENT
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
    favorites: [String]
    type: ListingType
    transactionType: TransactionType
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

  input UpdateProfileInput {
    name: String!
    email: String!
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }

  input ResetPasswordInput {
    token: String!
    newPassword: String!
    confirmNewPassword: String!
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
    propertySize: Int!
    transactionType: TransactionType
  }

  input EmailAgentListingInput {
    name: String!
    email: String!
    phone: String!
    message: String!
    listingId: ID!
  }

  input Price {
    min: Int!
    max: Int!
  }

  input FilterInput {
    price: Price
    type: [ListingType]
    transactionType: [TransactionType]
  }

  type Query {
    listings(
      page: Int!
      limit: Int!
      location: String
      filter: FilterInput
    ): Listings!
    listing(id: ID!): Listing!
    host(id: ID!): User!
    me: User!
  }

  type Mutation {
    signUp(input: SignUpInput): Viewer!
    login(input: LoginInput!): Viewer!
    loginWithGoogle(idToken: String!): Viewer!
    updateProfile(input: UpdateProfileInput!): Viewer!
    changePassword(input: ChangePasswordInput!): Viewer!
    forgotPassword(email: String!): String!
    resetPassword(input: ResetPasswordInput!): Viewer!
    emailTokenVerification(token: String!): Viewer!
    toggleFavorite(id: ID!): Listing!
    createListing(input: CreateListingInput!): Listing!
    emailAgentListing(input: EmailAgentListingInput!): Listing!
  }
`;
