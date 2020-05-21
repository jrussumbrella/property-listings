import React from "react";
import { Listing } from "../../../lib";
import styled from "styled-components";
import { Listings } from "../../../components";

const Container = styled.div`
  padding: 1rem 0;
`;

const Heading = styled.h2`
  font-weight: 600;
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
        <>
          <Heading> Listings </Heading>
          <Listings listings={listings.result} />
        </>
      )}
    </Container>
  );
};

export default UserListings;
