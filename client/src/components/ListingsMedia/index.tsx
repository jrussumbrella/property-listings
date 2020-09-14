import React from 'react';
import styled from 'styled-components';
import { Listing } from '../../types';
import ListingMediaItem from './ListingMediaItem';

interface Props {
  listings: Listing[];
}

const Container = styled.div`
  margin: 1rem 0;
`;

const ListingsMedia: React.FC<Props> = ({ listings }): JSX.Element => {
  return (
    <Container>
      {listings.map((listing) => (
        <ListingMediaItem listing={listing} key={listing.id} />
      ))}
    </Container>
  );
};

export default ListingsMedia;
