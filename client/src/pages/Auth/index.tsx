import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Common";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../graphql/mutations";
import AuthSocial from "./AuthSocial";
import styled from "styled-components";
import { useAuth } from "../../store";

const Container = styled.div`
  padding: 50px 0;
  background: #f4f5f7;
  min-height: 82vh;
`;

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  margin: 2rem 0;
  padding-top: 1rem;
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

const ErrorText = styled.div`
  color: var(--color-primary);
  font-size: 1.1rem;
  padding-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: var(--color-primary);
  font-size: 1.1rem;
  padding: 1rem 0;
  text-align: center;
`;

type FormData = {
  email: string;
  password: string;
};

export const Auth = () => {
  const { login: onLogin } = useAuth();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const history = useHistory();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      onLogin(data.login);
      history.push("/profile");
    },
    onError(err) {},
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    const input = { email, password };
    login({ variables: { input } });
  });

  return (
    <Container>
      <AuthWrapper>
        <Heading> Login your account </Heading>
        <Form onSubmit={onSubmit}>
          {error && (
            <ErrorMessage>
              {error.graphQLErrors[0].message.split(":")[1]}
            </ErrorMessage>
          )}
          <Group>
            <Input
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: "Email is required field.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </Group>
          <Group>
            <Input
              type="password"
              placeholder="Password "
              ref={register({
                required: "Password is required.",
                minLength: 6,
              })}
              name="password"
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
            <LinkWrapper>
              <Link to="/forgot-password"> Forgot your pasword? </Link>
            </LinkWrapper>
          </Group>
          <ButtonWrapper>
            <Button
              type="submit"
              title="Log In "
              classType="primary"
              disabled={loading}
              loading={loading}
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
