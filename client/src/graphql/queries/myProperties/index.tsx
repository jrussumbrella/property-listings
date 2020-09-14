import { gql } from 'apollo-boost';

export const MY_PROPERTIES = gql`
  query MyProperties($page: Int!, $limit: Int!) {
    me {
      id
      listings(page: $page, limit: $limit) {
        total
        result {
          id
          title
          imageUrl
          address
          price
        }
      }
    }
  }
`;
