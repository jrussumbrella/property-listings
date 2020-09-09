import React from 'react';
import { ListingsSkeleton } from '../../../../components';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin: 1rem 0;
  background-color: var(--color-gray);
`;

const Line = styled.div`
  background-color: var(--color-gray);
  height: 2rem;
  width: 15rem;
`;

export const UserSkeleton = () => {
  return (
    <Container>
      <Wrapper>
        <Circle />
        <Line />
      </Wrapper>
      <div style={{ marginTop: 20 }}>
        <ListingsSkeleton numbers={10} />
      </div>
    </Container>
  );
};
