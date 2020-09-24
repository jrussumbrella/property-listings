import { gql } from 'apollo-boost';

export const MY_FAVORITES = gql`
  query MyFavorites($page: Int!, $limit: Int!) {
    me {
      id
      favorites(page: $page, limit: $limit) {
        total
        result {
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
        }
      }
    }
  }
`;
