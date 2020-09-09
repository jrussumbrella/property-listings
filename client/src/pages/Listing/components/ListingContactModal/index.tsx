import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from '../../../../components/Common';
import { useModal, useAuth, useToast } from '../../../../store';
import { LISTING_CONTACT_MESSAGE } from '../../../../utils/constants';
import { EMAIL_AGENT_LISTING } from '../../../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

const FormGroup = styled.div`
  padding: 1rem 0;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  height: 3rem;
  padding: 0 1rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-dark-gray);
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--color-dark-gray);
`;

const ErrorText = styled.div`
  padding-top: 0.5rem;
  color: red;
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Props {
  id: string;
}

export const ListingContactModal: React.FC<Props> = ({ id }) => {
  const { toggleModal } = useModal();
  const { user } = useAuth();
  const { setToast } = useToast();

  const [emailAgentListing, { loading }] = useMutation(EMAIL_AGENT_LISTING, {
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      setToast('success', 'Successfully email sent to agent');
      toggleModal();
    },
  });

  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      message: LISTING_CONTACT_MESSAGE,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const input = {
      listingId: id,
      ...values,
    };
    emailAgentListing({ variables: { input } });
  });

  return (
    <Modal title="Contact Property">
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="name"> Name </Label>
          <Input
            type="text"
            name="name"
            id="name"
            ref={register({
              required: 'Name is required field.',
            })}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email"> Email </Label>
          <Input
            type="email"
            name="email"
            id="email"
            ref={register({
              required: 'Email is required field.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address.',
              },
            })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone"> Phone Number </Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            ref={register({
              required: 'Phone is required field.',
            })}
          />
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message"> Message </Label>
          <TextArea
            name="message"
            id="message"
            rows={3}
            ref={register({
              required: 'Message is required field.',
            })}
          ></TextArea>
          {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
        </FormGroup>
        <FormGroup>
          <Button
            title="Submit"
            classtype="primary"
            type="submit"
            style={{ width: '100%', height: '3rem' }}
            disabled={loading}
            loading={loading}
          />
        </FormGroup>
      </form>
    </Modal>
  );
};
