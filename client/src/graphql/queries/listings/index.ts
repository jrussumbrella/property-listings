import { gql } from "apollo-boost";

export const LISTINGS = gql`
  query Listings($page: Int!, $limit: Int!) {
    listings(page: $page, limit: $limit) {
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
