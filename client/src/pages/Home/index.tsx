import React from 'react';
import styled from 'styled-components';
import { HomeHero, HomeListings, FeaturedCities } from './components';

const Container = styled.div`
  padding: 2rem 1rem;
`;

export const Home = () => {
  return (
    <>
      <HomeHero />
      <Container>
        <FeaturedCities />
        <HomeListings />
      </Container>
    </>
  );
};
