import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from 'contexts';
import { LISTING_CONTACT_MESSAGE } from 'utils/constants';
import { ContactListing } from 'types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import { Form, FormGroup, Label, TextArea, ErrorText } from './styled';

interface Props {
  isVisible: boolean;
  id: string;
  closeModal(): void;
  emailAgent(listingContact: ContactListing): void;
  submitting: boolean;
}

const ListingContactModal: React.FC<Props> = ({
  id,
  closeModal,
  emailAgent,
  submitting,
  isVisible,
}): JSX.Element => {
  const { user } = useAuth();

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: LISTING_CONTACT_MESSAGE,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'Name must be at least 6 characters')
        .required('Name is required field'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required field'),
      phone: Yup.string().required('Phone is required field'),
      message: Yup.string().required('Message is required field'),
    }),
    onSubmit: (values) => {
      const input = {
        listingId: id,
        ...values,
      };
      emailAgent(input);
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      title="Contact Property"
      closeModal={closeModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="name"> Name </Label>
          <Input
            id="name"
            type="text"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            errorMessage={formik.touched.name && formik.errors.name}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email"> Email </Label>
          <Input
            type="email"
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
            errorMessage={formik.touched.email && formik.errors.email}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone"> Phone Number </Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            errorMessage={formik.touched.phone && formik.errors.phone}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message"> Message </Label>
          <TextArea
            name="message"
            id="message"
            rows={3}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message && (
            <ErrorText>{formik.errors.message}</ErrorText>
          )}
        </FormGroup>
        <FormGroup>
          <Button
            title="Submit"
            variant="primary"
            type="submit"
            style={{ width: '100%', height: '3rem' }}
            disabled={submitting}
            loading={submitting}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};

export default ListingContactModal;
