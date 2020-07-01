import { gql } from "apollo-boost";

export const LISTINGS = gql`
  query Listings($page: Int!, $limit: Int!, $location: String) {
    listings(page: $page, limit: $limit, location: $location) {
      total
      result {
        id
        title
        description
        imageUrl
        price
        isFavorite
      }
    }
  }
`;
