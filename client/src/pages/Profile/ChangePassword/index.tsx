import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import { useToast } from 'globalState';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PASSWORD } from 'graphql/mutations';
import { Container } from './styled';

const ChangePassword = () => {
  const { setToast } = useToast();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      setToast('success', 'Successfully update your new password');
    },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, 'Old Password must be at least 6 characters')
        .required('Old Password is required field'),
      newPassword: Yup.string()
        .min(6, 'New Password must be at least 6 characters')
        .required('New Password is required field'),
      confirmNewPassword: Yup.string()
        .min(6, 'Confirm New Password must be at least 6 characters')
        .required('Confirm New Password is required field'),
    }),
    onSubmit: (values) => {
      changePassword({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Old Password"
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(
            formik.touched.oldPassword && formik.errors.oldPassword
          )}
          errorMessage={formik.touched.oldPassword && formik.errors.oldPassword}
        />
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

export default ChangePassword;
