import { gql } from "apollo-boost";

export const LISTINGS = gql`
  query Listings($page: Int!, $limit: Int!, $location: String, $price: Price) {
    listings(page: $page, limit: $limit, location: $location, price: $price) {
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
