import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
    display: flex;
  }
`;

const CoverImg = styled.div`
  padding-bottom: 60%;
  background-color: var(--color-gray);
  @media ${(props) => props.theme.mediaQueries.desktop} {
    width: 55%;
  }
`;

const Line = styled.div`
  background-color: var(--color-gray);
  height: 2rem;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  padding: 1rem;
  flex: 1;
`;

const ListingSkeleton = (): JSX.Element => {
  return (
    <Container>
      <CoverImg />
      <Info>
        <Line style={{ height: '3rem' }} />
        <Line style={{ width: '60%' }} />
        <Line style={{ width: '40%' }} />
        <Line style={{ width: '60%' }} />
        <Line style={{ width: '60%' }} />
      </Info>
    </Container>
  );
};

export default ListingSkeleton;
