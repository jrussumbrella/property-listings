import { gql } from 'apollo-boost';

export const EMAIL_AGENT_LISTING = gql`
  mutation EmailAgentListing($input: EmailAgentListingInput!) {
    emailAgentListing(input: $input) {
      id
    }
  }
`;
