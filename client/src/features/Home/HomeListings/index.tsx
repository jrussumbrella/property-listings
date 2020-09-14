import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { LISTINGS } from 'graphql/queries';
import Listings from 'components/Listings';
import ListingsSkeleton from 'components/ListingsSkeleton';
import ErrorMessage from 'components/ErrorMessage';

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

const HomeListings: React.FC = (): JSX.Element => {
  const { loading, data, error } = useQuery(LISTINGS, {
    variables: { page: PAGE, limit: PAGE_LIMIT },
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <Container>
        <ListingsSkeleton numbers={10} />
      </Container>
    );

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
