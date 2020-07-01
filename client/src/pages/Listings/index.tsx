import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchListings from "./SearchListings";

const Container = styled.div`
  padding: 1rem;

  @media only screen and (min-width: 768px) {
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

export const Listings = () => {
  const { search } = useParams();

  return (
    <Container>
      <SearchText>
        Search Results for <span>"{search}"</span>
      </SearchText>
      <SearchListings location={search} />
    </Container>
  );
};
