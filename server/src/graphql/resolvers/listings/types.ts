import { Listing } from "../../../lib/types";

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
