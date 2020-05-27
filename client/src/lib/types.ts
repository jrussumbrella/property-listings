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
  id: string;
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
  bookings: string[];
  bookingsIndex: BookingsIndex;
}

export interface City {
  id: string;
  imageUrl: string;
  name: string;
}

export interface Viewer {
  token: string;
  user: User;
}
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  isEmailVerified: boolean;
}
