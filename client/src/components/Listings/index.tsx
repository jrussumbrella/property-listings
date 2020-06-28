import React from "react";
import ListingItem from "./ListingItem";
import { Listing } from "../../lib";
import styled from "styled-components";

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem 0;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

interface Props {
  listings: Listing[];
}

export const Listings: React.FC<Props> = ({ listings }) => {
  return (
    <StyledList>
      {listings.map((listing) => (
        <ListingItem listing={listing} key={listing.id} />
      ))}
    </StyledList>
  );
};
