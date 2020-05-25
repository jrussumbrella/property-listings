import React from "react";
import styled from "styled-components";
import { Spinner } from "../Spinner";

interface StyledButtonProps {
  classType: "primary" | "outline";
  onClick?(): void;
  style?: Object;
}

interface Props {
  title: string;
  classType: "primary" | "outline";
  type: "reset" | "submit" | "button";
  onClick?(): void;
  style?: Object;
  disabled?: boolean;
  loading?: boolean;
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
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
  title,
  type,
  classType,
  onClick,
  style,
  disabled,
  loading,
}: Props) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      classType={classType}
      style={style}
      disabled={disabled}
    >
      {loading ? <Spinner color="#fff" size={1.2} /> : title}
    </StyledButton>
  );
};
