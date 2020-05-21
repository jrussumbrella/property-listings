import { Listing } from "../../../lib/types";

export interface UserArgs {
  id: string;
}

export interface UserListingsArgs {
  page: number;
  limit: number;
}

export interface UserListingsData {
  total: number;
  result: Listing[];
}
