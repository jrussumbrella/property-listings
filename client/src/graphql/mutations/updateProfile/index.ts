import { gql } from 'apollo-boost';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
