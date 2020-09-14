import React from 'react';
import styled from 'styled-components';
import HomeHero from './HomeHero';
import FeaturedCities from './FeaturedCities';
import HomeListings from './HomeListings';

const Container = styled.div`
  padding: 2rem 1rem;
`;

const Home = (): JSX.Element => {
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

export default Home;
