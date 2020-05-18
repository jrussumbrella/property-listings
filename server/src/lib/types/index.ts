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
  rating?: number;
  price: number;
  host: string;
  type: ListingType;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
}

export interface User {
  _id: string;
  token: string;
  email: string;
  name: string;
  avatar: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorized?: boolean;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
}
