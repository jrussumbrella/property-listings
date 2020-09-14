import React from 'react';
import { useParams } from 'react-router-dom';
import ListingsFilter from './ListingsFilter';
import SearchListingsResult from './SearchListingsResults';
import {
  Container,
  SearchListingsContainer,
  SearchText,
  Wrapper,
  ListingsFilterContainer,
} from './styled';

interface Params {
  search: string;
}

const Listings = (): JSX.Element => {
  const { search } = useParams<Params>();

  return (
    <Container>
      <SearchText>
        Search Results for <span>{search}</span>
      </SearchText>
      <Wrapper>
        <ListingsFilterContainer>
          <ListingsFilter />
        </ListingsFilterContainer>
        <SearchListingsContainer>
          <SearchListingsResult location={search} />
        </SearchListingsContainer>
      </Wrapper>
    </Container>
  );
};

export default Listings;
