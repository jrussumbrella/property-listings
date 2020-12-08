import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { GoogleIcon } from 'components/Icons';
import Button from 'components/Button';
import PageLoader from 'components/PageLoader';
import { LOGIN_WITH_GOOGLE } from 'graphql/mutations';
import { useToast, useAuth } from 'contexts';
import styled from 'styled-components';

const GoogleLoginButton = styled(Button)`
  width: 100%;
  border: 1px solid rgb(205, 209, 212);
  color: var(--color-dark);
`;

const AuthSocial = (): JSX.Element => {
  const history = useHistory();
  const { setToast } = useToast();
  const { login } = useAuth();

  const [loginWithGoogle, { loading }] = useMutation(LOGIN_WITH_GOOGLE, {
    onCompleted(data) {
      login(data.loginWithGoogle);
      history.push('/profile');
    },
    onError() {
      setToast(
        'error',
        'Unable to login with google right now. Please try again later'
      );
    },
  });

  const responseGoogle = (response: any) => {
    if (response.error) {
      console.log(response);
      return;
    }
    loginWithGoogle({ variables: { idToken: response.tokenId } });
  };

  const pageLoaderElement = loading ? <PageLoader /> : null;

  return (
    <>
      {pageLoaderElement}
      <GoogleLogin
        clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
        render={(renderProps) => (
          <GoogleLoginButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            icon={<GoogleIcon />}
            type="button"
            title="Login with Google"
            variant="outline"
          />
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

export default AuthSocial;
