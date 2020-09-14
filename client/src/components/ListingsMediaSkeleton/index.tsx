import React from 'react';
import { Heading, Item, Box, Info, Line } from './styled';

const ListingsMediaSkeleton = (): JSX.Element => {
  const listArr = Array(10)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div>
      <Heading />
      <div>
        {listArr.map((arr) => (
          <Item key={arr}>
            <Box />
            <Info>
              <Line />
              <Line />
            </Info>
          </Item>
        ))}
      </div>
    </div>
  );
};

export default ListingsMediaSkeleton;
