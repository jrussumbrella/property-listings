import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SearchListings, ListingsFilter } from './components';

const Container = styled.div`
  padding: 1rem;

  @media ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

const SearchText = styled.div`
  padding: 1rem 0;
  font-size: 1.2rem;

  span {
    font-weight: 600;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const ListingsFilterContainer = styled.div`
  width: 15rem;
  padding-right: 1rem;
`;

const SearchListingsContainer = styled.div`
  flex: 1;
`;

export const Listings = () => {
  const { search } = useParams();

  return (
    <Container>
      <SearchText>
        Search Results for <span>"{search}"</span>
      </SearchText>
      <Wrapper>
        <ListingsFilterContainer>
          <ListingsFilter />
        </ListingsFilterContainer>
        <SearchListingsContainer>
          <SearchListings location={search} />
        </SearchListingsContainer>
      </Wrapper>
    </Container>
  );
};
