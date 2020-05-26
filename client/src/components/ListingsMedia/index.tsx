import React from "react";
import { Listing } from "../../lib";
import ListingMediaItem from "./ListingMediaItem";
import styled from "styled-components";

interface Props {
  listings: Listing[];
}

const Container = styled.div`
  margin: 1rem 0;
`;

export const ListingsMedia: React.FC<Props> = ({ listings }) => {
  return (
    <Container>
      {listings.map((listing) => (
        <ListingMediaItem listing={listing} key={listing.id} />
      ))}
    </Container>
  );
};
