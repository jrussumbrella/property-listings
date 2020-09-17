import { gql } from 'apollo-boost';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
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
