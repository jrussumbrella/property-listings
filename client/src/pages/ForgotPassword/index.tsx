import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import Input from 'components/Input';
import Meta from 'components/Meta';
import { useToast } from 'contexts';
import { FORGOT_PASSWORD } from 'graphql/mutations';
import { Container, AuthWrapper, Heading, Form } from './styled';

const initialValues = {
  email: '',
};

const ForgotPassword = (): JSX.Element => {
  const { setToast } = useToast();

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
    onCompleted() {
      setToast('success', 'Successfully sent. Please check your email');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required field'),
    }),
    onSubmit: (values) => {
      forgotPassword({ variables: { email: values.email } });
    },
  });

  return (
    <Container>
      <Meta title="Forgot Password" />
      <AuthWrapper>
        <Heading> Forgot your Password </Heading>
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
          <Button
            type="submit"
            title="Send"
            variant="primary"
            disabled={loading}
            loading={loading}
            style={{
              width: '100%',
              fontWeight: 600,
              fontSize: '1.2rem',
            }}
          />
        </Form>
      </AuthWrapper>
    </Container>
  );
};

export default ForgotPassword;
