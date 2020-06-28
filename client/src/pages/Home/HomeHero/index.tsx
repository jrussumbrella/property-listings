import React from "react";
import styled from "styled-components";
import SearchForm from "./SearchForm";

const StyledHero = styled.div`
  height: 18rem;
  width: 100%;
  background-size: cover;
  position: relative;
  background-position: center center;

  @media only screen and (min-width: 768px) {
    height: 30rem;
  }
`;

const Info = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
`;

const Hero = () => {
  return (
    <StyledHero
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/349749/kitchen-stove-sink-kitchen-counter-349749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
      }}
    >
      <Info>
        <Title> Find a place to stay </Title>
        <SearchForm />
      </Info>
    </StyledHero>
  );
};

export default Hero;
