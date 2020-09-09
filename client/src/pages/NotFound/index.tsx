import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 5rem 0;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

export const NotFound = () => {
  return (
    <Container>
      <h1> 404 </h1>
      <h2>Page Not Found </h2>
    </Container>
  );
};
