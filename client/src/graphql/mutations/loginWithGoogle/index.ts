import { gql } from 'apollo-boost';

export const LOGIN_WITH_GOOGLE = gql`
  mutation LoginWithGoogle($idToken: String!) {
    loginWithGoogle(idToken: $idToken) {
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
