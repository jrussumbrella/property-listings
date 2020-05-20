import React from "react";
import styled from "styled-components";
import HomeHero from "./HomeHero";
import HomeListings from "./HomeListings";

const Container = styled.div`
  padding: 2rem 1rem;
`;

export const Home = () => {
  return (
    <>
      <HomeHero />
      <Container>
        <HomeListings />
      </Container>
    </>
  );
};
