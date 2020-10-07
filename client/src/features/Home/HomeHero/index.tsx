import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import SearchTab from './SearchTab';

const StyledHero = styled.div`
  height: 18rem;
  width: 100%;
  background-size: cover;
  position: relative;
  background-position: center center;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    height: 30rem;
  }
`;

const Info = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    font-size: 2.5rem;
  }
`;

const HomeHero = (): JSX.Element => {
  const [transactionType, setTransactionType] = useState('rent');

  const handleOnChangeTab = (selected: string) => {
    setTransactionType(selected);
  };

  return (
    <StyledHero
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/349749/kitchen-stove-sink-kitchen-counter-349749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
      }}
    >
      <Info>
        <Title> Find a place to stay </Title>
        <SearchTab onChangeTab={handleOnChangeTab} selected={transactionType} />
        <SearchForm selectedTransaction={transactionType} />
      </Info>
    </StyledHero>
  );
};

export default HomeHero;
