import { gql } from 'apollo-boost';

export const HOST = gql`
  query Host($id: ID!, $page: Int!, $limit: Int!) {
    host(id: $id) {
      id
      name
      photoUrl
      email
      listings(page: $page, limit: $limit) {
        total
        result {
          id
          title
          imageUrl
          price
          favorites
        }
      }
    }
  }
`;
