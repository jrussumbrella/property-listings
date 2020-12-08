export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
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
  numOfBaths: number;
  numOfBedrooms: number;
  rating?: number;
  price: number;
  host: User;
  type: ListingType;
  bookings: string[];
  propertySize: number;
  favorites: string[];
}

export interface ContactListing {
  name: string;
  email: string;
  message: string;
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
  phone: string;
}
