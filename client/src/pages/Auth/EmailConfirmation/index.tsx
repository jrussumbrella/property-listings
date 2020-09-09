import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { EMAIL_VERIFICATION } from '../../../graphql/mutations';
import { useAuth, useToast } from '../../../store';
import { Spinner } from '../../../components/Common';
import { Alert } from '../../../components';
import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 1rem;
  text-align: center;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

export const EmailConfirmation = () => {
  const { token } = useParams();
  const { login } = useAuth();
  const { setToast } = useToast();
  const history = useHistory();

  const [confirmEmail, { error, loading }] = useMutation(EMAIL_VERIFICATION, {
    variables: { token },
    onCompleted(data) {
      setToast('success', 'Successfully verified email.');
      login(data.emailTokenVerification);
      history.push('/profile');
    },
    onError(err) {},
  });

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  if (loading) {
    return (
      <Container>
        <Title> Verifying your Email... </Title>
        <Spinner size={5} color={'var(--color-primary)'} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert message="Error in verifying email." type="error" />
      </Container>
    );
  }

  return null;
};
