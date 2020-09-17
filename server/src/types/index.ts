import { ObjectId, Collection } from 'mongodb';

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
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
  propertySize: string;
  rating?: number;
  price: number;
  host: string;
  isFavorite?: boolean;
  type: ListingType;
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
  favorites: ObjectId[];
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

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  passwordResets: Collection<PasswordResets>;
}
