import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import Meta from 'components/Meta';
import { useToast } from 'contexts';
import { useMutation } from '@apollo/react-hooks';
import { RESET_PASSWORD } from 'graphql/mutations';
import { Container, Heading } from './styled';

interface Params {
  token: string;
}

const ResetPassword = () => {
  const history = useHistory();
  const { setToast } = useToast();
  const { token } = useParams<Params>();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted() {
      setToast('success', 'Successfully update your new password');
      history.push('/login');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const initialValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'New Password must be at least 6 characters')
        .required('New Password is required field'),
      confirmNewPassword: Yup.string()
        .min(6, 'Confirm New Password must be at least 6 characters')
        .required('Confirm New Password is required field'),
    }),
    onSubmit: (values) => {
      const input = {
        ...values,
        token,
      };
      resetPassword({ variables: { input } });
    },
  });

  return (
    <Container>
      <Meta title="Reset Password" />
      <Heading> Reset Password </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          id="newPassword"
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.newPassword && formik.errors.newPassword
          )}
          errorMessage={formik.touched.newPassword && formik.errors.newPassword}
        />
        <Input
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
          )}
          errorMessage={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
        />
        <Button
          type="submit"
          title="Save Changes"
          loading={loading}
          disabled={loading}
        />
      </form>
    </Container>
  );
};

export default ResetPassword;
