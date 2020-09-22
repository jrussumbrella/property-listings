import { gql } from 'apollo-boost';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
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
