import { Listing } from '../../../types';

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

export interface UserFavoritesArgs {
  page: number;
  limit: number;
}

export interface UserFavoritesData {
  total: number;
  result: Listing[];
}
