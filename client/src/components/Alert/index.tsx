import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
  type: "error" | "success" | "info";
}

interface StyledProps {
  type: "error" | "success" | "info";
}

const StyledAlert = styled.div<StyledProps>`
  padding: 1rem;
  border-radius: 6px;
  color: ${(props) => (props.type === "error" ? "#721c24" : "#004085")};
  background-color: ${(props) =>
    props.type === "error" ? "#f8d7da" : "#cce5ff"};
  border-color: ${(props) => (props.type === "error" ? "#f5c6cb" : "#b8daff")};
  font-size: 1.1rem;
  line-height: 1.2;
`;

export const Alert: React.FC<Props> = ({ message, type }) => {
  return <StyledAlert type={type}>{message}</StyledAlert>;
};
