import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../graphql/queries";
import ListingInfo from "./ListingInfo";
import ListingAction from "./ListingAction";
import ListingSkeleton from "./ListingSkeleton";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 6rem;

  @media only screen and (min-width: 768px) {
    max-width: 1200px;
    margin: 1rem auto;
  }
`;

export const Listing = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(LISTING, { variables: { id } });

  if (loading) return <ListingSkeleton />;

  if (error) return <h2>Error</h2>;

  const { listing } = data;

  return (
    <Container>
      <ListingInfo listing={listing} />
      <ListingAction listing={listing} />
    </Container>
  );
};
