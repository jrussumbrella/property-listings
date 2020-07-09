import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MY_PROPERTIES } from "../../graphql/queries";
import {
  ListingsMedia,
  EmptyMessage,
  ListingsMediaSkeleton,
} from "../../components";
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
`;

const PAGE_LIMIT = 10;

export const MyProperties = () => {
  const { data, loading, error } = useQuery(MY_PROPERTIES, {
    variables: { page: 1, limit: PAGE_LIMIT },
  });

  if (error) return <div>Error</div>;

  if (loading) {
    return (
      <Container>
        <ListingsMediaSkeleton />
      </Container>
    );
  }

  const { listings } = data.me;

  return (
    <Container>
      {listings.total === 0 ? (
        <EmptyMessage
          message="Nothing to see here yet."
          description="Your properties will display here."
        />
      ) : (
        <>
          <Heading> My Properties </Heading>
          <ListingsMedia listings={listings.result} />
        </>
      )}
    </Container>
  );
};
