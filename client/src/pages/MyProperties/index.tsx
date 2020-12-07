import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { MY_PROPERTIES } from 'graphql/queries';
import ListingsMedia from 'components/ListingsMedia';
import EmptyMessage from 'components/EmptyMessage';
import ErrorMessage from 'components/ErrorMessage';
import ListingsMediaSkeleton from 'components/ListingsMediaSkeleton';
import Meta from 'components/Meta';

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

const MyProperties = (): JSX.Element => {
  const { data, loading, error } = useQuery(MY_PROPERTIES, {
    variables: { page: 1, limit: PAGE_LIMIT },
  });

  if (error)
    return <ErrorMessage message="Something went wrong. Please try again." />;

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
      <Meta title="My Properties" />
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

export default MyProperties;
