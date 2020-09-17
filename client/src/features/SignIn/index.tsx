import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import AuthSocial from 'components/AuthSocial';
import AuthLink from 'components/AuthLink';
import Input from 'components/Input';
import { useAuth, useToast } from 'globalState';
import { LOGIN } from 'graphql/mutations';
import {
  Container,
  AuthWrapper,
  Heading,
  Form,
  LinkWrapper,
  ButtonWrapper,
} from './styled';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = (): JSX.Element => {
  const { setToast } = useToast();
  const { login: onLogin } = useAuth();
  const history = useHistory();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      onLogin(data.login);
      history.push('/profile');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required field'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required field'),
    }),
    onSubmit: (values) => {
      login({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <AuthWrapper>
        <Heading> Login your account </Heading>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
            errorMessage={formik.touched.email && formik.errors.email}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password "
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            errorMessage={formik.touched.password && formik.errors.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
          />
          <LinkWrapper>
            <Link to="/forgot-password"> Forgot your pasword? </Link>
          </LinkWrapper>
          <ButtonWrapper>
            <Button
              type="submit"
              title="Log In "
              variant="primary"
              disabled={loading}
              loading={loading}
              style={{
                width: '100%',
                fontWeight: 600,
                fontSize: '1.2rem',
              }}
            />
          </ButtonWrapper>
        </Form>
        <AuthLink link="login" />
        <AuthSocial />
      </AuthWrapper>
    </Container>
  );
};

export default SignIn;
