import React from 'react';
import { Listing } from 'types';
import { StyledList } from './styled';
import ListingItem from './ListingItem';

interface Props {
  listings: Listing[];
}

const Listings: React.FC<Props> = ({ listings }): JSX.Element => {
  return (
    <StyledList>
      {listings.map((listing) => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </StyledList>
  );
};

export default Listings;
