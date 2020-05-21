import React from "react";
import { Listing } from "../../../lib";
import styled from "styled-components";
import { Listings } from "../../../components";

const Container = styled.div`
  padding: 1rem 0;
`;

const Heading = styled.h2`
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;

const ListingWrapper = styled.div`
  margin-top: 2rem;
`;

interface UserListingsData {
  total: number;
  result: Listing[];
}

interface Props {
  listings: UserListingsData;
}

const UserListings: React.FC<Props> = ({ listings }) => {
  return (
    <Container>
      {listings.total === 0 ? (
        <div> No listings created yet. </div>
      ) : (
        <ListingWrapper>
          <Heading> Listings </Heading>
          <Listings listings={listings.result} />
        </ListingWrapper>
      )}
    </Container>
  );
};

export default UserListings;
