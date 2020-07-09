import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LISTINGS } from "../../../graphql/queries";
import { Listings, ListingsSkeleton, ErrorMessage } from "../../../components";
import styled from "styled-components";

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
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

  if (error) return <ErrorMessage message="Error in fetching listings" />;

  const listings = data.listings.result;

  return (
    <Container>
      <Title> Properties You May Like </Title>
      <Listings listings={listings} />
    </Container>
  );
};

export default HomeListings;
