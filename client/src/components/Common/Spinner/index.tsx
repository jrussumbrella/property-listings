import React from "react";
import styled from "styled-components";

interface Props {
  color: string;
  size: number;
}

const StyledSpinner = styled.div<Props>`
  display: inline-block;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  vertical-align: text-bottom;
  border: 0.15em solid
    ${(props) => (props.color ? props.color : "var(--color-primary)")};
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = ({ color, size }: Props) => {
  return <StyledSpinner color={color} size={size}></StyledSpinner>;
};
