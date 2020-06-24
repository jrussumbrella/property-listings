import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";
import { Listings, ListingsSkeleton } from "../../../components";
import styled from "styled-components";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const HomeListings: React.FC<{}> = () => {
  const { loading, data, error } = useQuery(LISTINGS, {
    variables: { page: 1, limit: 10 },
  });

  if (loading) return <ListingsSkeleton numbers={10} />;

  if (error) return <h2>Error</h2>;

  const listings = data.listings.result;

  return (
    <div>
      <Title> Properties You May Like </Title>
      <Listings listings={listings} />
    </div>
  );
};

export default HomeListings;
