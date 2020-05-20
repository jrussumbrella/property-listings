import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--color-primary);
  color: #fff;
  border: 1px solid var(--color-primary);
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
`;

export const Button = ({ ...rest }) => {
  return <StyledButton {...rest}> List your property</StyledButton>;
};
