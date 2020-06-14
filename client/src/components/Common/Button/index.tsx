import React from "react";
import styled from "styled-components";
import { Spinner } from "../Spinner";
import { Link } from "react-router-dom";

interface StyledButtonProps {
  classtype?: "primary" | "outline";
  onClick?(): void;
  style?: Object;
}

interface Props {
  title: string;
  classtype?: "primary" | "outline";
  type: "reset" | "submit" | "button";
  onClick?(): void;
  style?: Object;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    props.classtype === "outline" ? "#fff" : "var(--color-primary)"};
  color: ${(props) =>
    props.classtype === "outline" ? "var(--color-primary)" : "#fff"};
  border: 1px solid
    ${(props) =>
      props.classtype === "outline" ? "var(--color-primary)" : "#fff"};
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)<StyledButtonProps>`
  background-color: ${(props) =>
    props.classtype === "outline" ? "#fff" : "var(--color-primary)"};
  color: ${(props) =>
    props.classtype === "outline" ? "var(--color-primary)" : "#fff"};
  border: 1px solid
    ${(props) =>
      props.classtype === "outline" ? "var(--color-primary)" : "#fff"};
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const Button = ({
  title,
  type,
  classtype,
  onClick,
  style,
  disabled,
  loading,
  to,
}: Props) => {
  return (
    <>
      {to ? (
        <StyledLink
          type={type}
          onClick={onClick}
          classtype={classtype}
          style={style}
          to={to}
        >
          {loading ? <Spinner color="#fff" size={1.2} /> : title}
        </StyledLink>
      ) : (
        <StyledButton
          type={type}
          onClick={onClick}
          classtype={classtype}
          style={style}
          disabled={disabled}
        >
          {loading ? <Spinner color="#fff" size={1.2} /> : title}
        </StyledButton>
      )}
    </>
  );
};
