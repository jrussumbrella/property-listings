import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
  description: string;
}

const Container = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const Message = styled.div`
  padding: 0.8rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Description = styled.div`
  color: var(--color-light-gray);
`;

export const EmptyMessage = ({ message, description }: Props) => {
  return (
    <Container>
      <Message>{message}</Message>
      <Description>{description}</Description>
    </Container>
  );
};
