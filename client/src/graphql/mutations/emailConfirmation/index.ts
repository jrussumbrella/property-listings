import { gql } from 'apollo-boost';

export const EMAIL_VERIFICATION = gql`
  mutation EmailVerification($token: String!) {
    emailTokenVerification(token: $token) {
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
