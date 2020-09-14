import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 0;
  text-align: center;
  line-height: 1.2;

  a {
    color: var(--color-primary);
  }
`;

interface Props {
  link: 'login' | 'signup';
}

const AuthLink = ({ link }: Props): JSX.Element => {
  const linkElement =
    link === 'login' ? (
      <p>
        Don&lsquo;t have an account?
        <Link to="/sign-up"> Create an account </Link>.
      </p>
    ) : (
      <p>
        Already have an account?
        <Link to="/login"> Login to your account </Link>.
      </p>
    );

  return <Container>{linkElement}</Container>;
};

export default AuthLink;
