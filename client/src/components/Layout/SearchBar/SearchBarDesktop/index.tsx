import React from 'react';
import styled from 'styled-components';
import { SearchBarForm } from '../SearchBarForm';

const Container = styled.div`
  display: none;
  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;

export const SearchBarDesktop = (): JSX.Element => {
  return (
    <Container>
      <SearchBarForm />
    </Container>
  );
};
