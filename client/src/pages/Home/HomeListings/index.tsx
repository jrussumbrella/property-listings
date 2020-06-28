import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";
import { Listings, ListingsSkeleton } from "../../../components";
import styled from "styled-components";

const Container = styled.div`
  @media only screen and (min-width: 768px) {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const PAGE_LIMIT = 12;
const PAGE = 1;

const HomeListings: React.FC<{}> = () => {
  const { loading, data, error } = useQuery(LISTINGS, {
    variables: { page: PAGE, limit: PAGE_LIMIT },
  });

  if (loading) return <ListingsSkeleton numbers={10} />;

  if (error) return <h2>Error</h2>;

  const listings = data.listings.result;

  return (
    <Container>
      <Title> Properties You May Like </Title>
      <Listings listings={listings} />
    </Container>
  );
};

export default HomeListings;
