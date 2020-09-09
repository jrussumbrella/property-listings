import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { LISTING } from '../../graphql/queries';
import { ListingInfo, ListingAction, ListingSkeleton } from './components';
import styled from 'styled-components';
import { ErrorMessage } from '../../components';

interface Params {
  id: string;
}

const Container = styled.div`
  padding-bottom: 6rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const Listing = () => {
  const { id } = useParams<Params>();
  const { loading, error, data } = useQuery(LISTING, { variables: { id } });

  if (loading)
    return (
      <Container>
        <ListingSkeleton />
      </Container>
    );

  if (error) return <ErrorMessage message="Listing not found" />;

  const { listing } = data;

  return (
    <Container>
      <ListingInfo listing={listing} />
      <ListingAction listing={listing} />
    </Container>
  );
};
