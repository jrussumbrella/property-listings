import React from "react";
import { GoogleIcon } from "../../../components/Common";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  background-color: #fff;
  border: 1px solid rgb(205, 209, 212);
  border-radius: 6px;
  cursor: pointer;

  svg {
    height: 1.5rem;
    width: 2rem;
  }
`;

const Text = styled.span`
  padding: 0 0.5rem;
`;

const AuthSocial = () => {
  return (
    <div>
      <Button>
        <GoogleIcon />
        <Text> Login with google </Text>
      </Button>
    </div>
  );
};

export default AuthSocial;
