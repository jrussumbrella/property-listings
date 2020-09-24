import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      id
      name
      email
      photoUrl
      isEmailVerified
    }
  }
`;
