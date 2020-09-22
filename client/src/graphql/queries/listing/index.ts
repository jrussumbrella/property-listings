import { gql } from 'apollo-boost';

export const LISTING = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      id
      title
      imageUrl
      description
      price
      numOfGuests
      numOfBaths
      numOfBedrooms
      propertySize
      address
      favorites
      host {
        id
        name
        photoUrl
      }
    }
  }
`;
