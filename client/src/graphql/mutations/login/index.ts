import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        photoUrl
        isEmailVerified
      }
    }
  }
`;
