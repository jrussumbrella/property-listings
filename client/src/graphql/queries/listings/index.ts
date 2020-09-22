import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings(
    $page: Int!
    $limit: Int!
    $location: String
    $filter: FilterInput
  ) {
    listings(page: $page, limit: $limit, location: $location, filter: $filter) {
      total
      result {
        id
        title
        description
        imageUrl
        price
        numOfGuests
        numOfBaths
        numOfBedrooms
        propertySize
        favorites
      }
    }
  }
`;
