import React from 'react';
import { Title, List, Line, Info, CoverWrapper } from './styled';

interface Props {
  numbers: number;
}

const ListingsSkeleton: React.FC<Props> = ({ numbers = 12 }): JSX.Element => {
  const listingBox = Array(numbers)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div>
      <Title />
      <List>
        {listingBox.map((listing) => (
          <div key={listing}>
            <CoverWrapper />
            <Info>
              <Line />
              <Line style={{ width: '40%' }} />
            </Info>
          </div>
        ))}
      </List>
    </div>
  );
};

export default ListingsSkeleton;
