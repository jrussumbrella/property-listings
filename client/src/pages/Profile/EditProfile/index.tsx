import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/Input';
import Button from 'components/Button';
import { useAuth, useToast } from 'contexts';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PROFILE } from 'graphql/mutations';
import { Container } from './styled';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const { setToast } = useToast();

  const initialValues = {
    name: user?.name ? user.name : '',
    email: user?.email ? user.email : '',
  };

  const [updateUserProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted(data) {
      updateProfile(data.updateProfile.user);
      setToast('success', 'Successfully updated your user profile');
    },
    onError() {
      setToast(
        'error',
        'Unable to update your user profile right now. Please try again later'
      );
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'Name must be at least 6 characters')
        .required('Name is required field'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required field'),
    }),
    onSubmit: (values) => {
      updateUserProfile({ variables: { input: values } });
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          id="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.email && formik.errors.email)}
          errorMessage={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" title="Save Changes" loading={loading} />
      </form>
    </Container>
  );
};

export default EditProfile;
