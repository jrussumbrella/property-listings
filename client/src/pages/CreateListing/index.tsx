import React from 'react';
import { CreateListingForm } from './components';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export const CreateListing = () => {
  return (
    <Container>
      <h1> Create a Property </h1>
      <CreateListingForm />
    </Container>
  );
};
