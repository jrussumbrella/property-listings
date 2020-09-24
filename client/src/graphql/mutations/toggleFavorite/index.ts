import { gql } from 'apollo-boost';

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      title
      imageUrl
      description
      price
      address
      favorites
    }
  }
`;
