import React from 'react';
import styled from 'styled-components';
import Meta from 'components/Meta';
import HomeHero from './HomeHero';
import FeaturedCities from './FeaturedCities';
import HomeListings from './HomeListings';

const Container = styled.div`
  padding: 2rem 1rem;
`;

const Home = (): JSX.Element => {
  return (
    <>
      <Meta title="Home" />
      <HomeHero />
      <Container>
        <FeaturedCities />
        <HomeListings />
      </Container>
    </>
  );
};

export default Home;
