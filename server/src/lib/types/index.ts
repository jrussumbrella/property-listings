import { ObjectId, Collection } from "mongodb";

export interface BookingsIndexMonth {
  [key: string]: boolean;
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE",
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
  password: string;
  photoUrl?: string;
  walletId?: string;
  listings: ObjectId[];
  bookings: ObjectId[];
  favorites: ObjectId[];
  income: number;
}

export interface Viewer {
  token: string;
  user: User;
  walletId?: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
}
