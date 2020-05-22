import React from "react";
import { Button } from "../../components/Common";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthSocial from "./AuthSocial";

const Container = styled.div`
  padding: 50px 0;
  background: #f4f5f7;
  min-height: 82vh;
`;

const Form = styled.div`
  width: 100%;
  background-color: #fff;
  margin: 2rem 0;
`;

const Group = styled.div`
  padding: 1rem 2rem;
`;

const Input = styled.input`
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-dark);
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const LinkWrapper = styled.div`
  padding-top: 1rem;
  text-align: right;

  a {
    color: var(--color-blue);
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const AuthWrapper = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

export const Auth = () => {
  return (
    <Container>
      <AuthWrapper>
        <Heading> Login your account </Heading>
        <Form>
          <Group>
            <Input type="text" placeholder="Email" />
          </Group>
          <Group>
            <Input type="text" placeholder="Password " />
            <LinkWrapper>
              <Link to="/forgot-password"> Forgot your pasword? </Link>
            </LinkWrapper>
          </Group>
          <ButtonWrapper>
            <Button
              type="submit"
              title="Log In "
              classType="primary"
              style={{
                width: "100%",
                height: "4rem",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            />
          </ButtonWrapper>
        </Form>
        <AuthSocial />
      </AuthWrapper>
    </Container>
  );
};
