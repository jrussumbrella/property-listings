import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { EMAIL_VERIFICATION } from 'graphql/mutations';
import { useAuth, useToast } from 'globalState';
import Alert from 'components/Alert';
import Spinner from 'components/Spinner';
import { Container, Title } from './styled';

const EmailConfirmation = (): JSX.Element | null => {
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
    onError() {
      setToast(
        'error',
        'There was an error verify your account. Please try again later.'
      );
    },
  });

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  if (loading) {
    return (
      <Container>
        <Title> Verifying your Email... </Title>
        <Spinner size={5} color="var(--color-primary)" />
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

export default EmailConfirmation;
