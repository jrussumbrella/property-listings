import { ObjectId, Collection } from 'mongodb';

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export enum TransactionType {
  Rent = 'RENT',
  Buy = 'BUY',
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  country: string;
  city: string;
  admin: string;
  numOfGuests: number;
  numOfBaths: number;
  numOfBedrooms: number;
  propertySize: number;
  rating?: number;
  price: number;
  host: string;
  favorites?: string[];
  type: ListingType;
  verified: boolean;
  transactionType: TransactionType;
}

export interface User {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  googleId?: string;
  password?: string;
  photoUrl?: string;
  listings: ObjectId[];
  phone?: string;
}

export interface Viewer {
  token: string;
  user: User;
}

export interface PasswordResets {
  _id: string;
  token: string;
  email: string;
  expiredAt: number;
}

export interface Favorites {
  _id: ObjectId;
  userId: string;
  listingId: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  passwordResets: Collection<PasswordResets>;
  favorites: Collection<Favorites>;
}
