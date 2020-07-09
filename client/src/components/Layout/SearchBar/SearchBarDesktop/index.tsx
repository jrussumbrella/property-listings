import React from "react";
import { SearchBarForm } from "../SearchBarForm";
import styled from "styled-components";

const Container = styled.div`
  display: none;
  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;

export const SearchBarDesktop = () => {
  return (
    <Container>
      <SearchBarForm />
    </Container>
  );
};
