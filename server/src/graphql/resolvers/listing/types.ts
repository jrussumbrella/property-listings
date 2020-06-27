import { Listing, ListingType } from "../../../lib/types";
import { ObjectID } from "mongodb";

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

export interface EmailAgentListingInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  listingId: string;
}

export interface EmailAgentListingArgs {
  input: EmailAgentListingInput;
}
