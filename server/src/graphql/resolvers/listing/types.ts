import { Listing, ListingType } from "../../../lib/types";

export interface ListingsData {
  total: number;
  result: Listing[];
}

export interface ListingsArgs {
  page: number;
  limit: number;
}

export interface ListingArgs {
  id: string;
}

export interface CreateListingInput {
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBaths: number;
  numOfBedrooms: number;
  propertySize: string;
}

export interface CreateListingArgs {
  input: CreateListingInput;
}
