import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import ErrorMessage from 'components/ErrorMessage';
import { LISTING } from '../../graphql/queries';
import ListingInfo from './ListingInfo';
import ListingAction from './ListingAction';
import ListingSkeleton from './ListingSkeleton';

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

const Listing = (): JSX.Element => {
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

export default Listing;
