import React from "react";
import styled from "styled-components";
import { Button } from "../Common";

const Container = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Message = styled.div`
  padding: 1rem 0;
  font-size: 1.2rem;
`;

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Message>{message}</Message>
      <Button
        type="button"
        title="Refresh Page"
        onClick={handleRefresh}
        classtype="primary"
      />
    </Container>
  );
};
