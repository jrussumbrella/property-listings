import React from "react";
import styled from "styled-components";
import HomeListings from "./HomeListings";

const Container = styled.div`
  padding: 2rem 1rem;
`;

export const Home = () => {
  return (
    <Container>
      <HomeListings />
    </Container>
  );
};
