import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { LISTING } from "../../graphql/queries";
import ListingInfo from "./ListingInfo";
import ListingAction from "./ListingAction";
import ListingSkeleton from "./ListingSkeleton";
import ListingContact from "./ListingContact";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 6rem;
`;

export const Listing = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(LISTING, { variables: { id } });

  if (loading) return <ListingSkeleton />;

  if (error) return <h2>Error</h2>;

  const { listing } = data;
  const { host } = listing;

  return (
    <Container>
      <ListingInfo listing={listing} />
      <ListingContact host={host} />
      <ListingAction />
    </Container>
  );
};
