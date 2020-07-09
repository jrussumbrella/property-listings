import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MY_FAVORITES } from "../../graphql/queries";
import { EmptyMessage, Listings, ListingsSkeleton } from "../../components";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Heading = styled.h2`
  font-weight: 600;
  text-align: center;
`;

const PAGE_LIMIT = 10;

export const MyFavorites = () => {
  const { data, loading, error } = useQuery(MY_FAVORITES, {
    variables: { page: 1, limit: PAGE_LIMIT },
    fetchPolicy: "cache-and-network",
  });

  if (error) return <div> Something went wrong </div>;

  if (loading) {
    return (
      <Container>
        <ListingsSkeleton numbers={5} />
      </Container>
    );
  }

  const { favorites } = data.me;

  return (
    <Container>
      {favorites.total === 0 ? (
        <EmptyMessage
          message="Nothing to see here yet."
          description="Your properties will display here."
        />
      ) : (
        <>
          <Heading> My Favorites </Heading>
          <Listings listings={favorites.result} />
        </>
      )}
    </Container>
  );
};
