import React from "react";
import { CreateListingForm } from "./CreateListingForm";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

export const CreateListing = () => {
  return (
    <Container>
      <h1> Create a Property </h1>
      <CreateListingForm />
    </Container>
  );
};
