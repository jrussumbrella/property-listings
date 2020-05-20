import React from "react";
import styled from "styled-components";

interface StyledButtonProps {
  classType: "primary" | "outline";
  onClick?(): void;
}

interface Props {
  title: string;
  classType: "primary" | "outline";
  type: "reset" | "submit" | "button";
  onClick?(): void;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    props.classType === "outline" ? "#fff" : "var(--color-primary)"};
  color: ${(props) =>
    props.classType === "outline" ? "var(--color-primary)" : "#fff"};
  border: 1px solid
    ${(props) =>
      props.classType === "outline" ? "var(--color-primary)" : "#fff"};
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
`;

export const Button = ({ title, type, classType, onClick }: Props) => {
  return (
    <StyledButton type={type} onClick={onClick} classType={classType}>
      {title}
    </StyledButton>
  );
};
