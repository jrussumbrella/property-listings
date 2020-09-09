import React from 'react';
import { GoogleIcon } from '../../../../components/Common/Icons';
import { Button, PageLoader } from '../../../../components/Common';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_WITH_GOOGLE } from '../../../../graphql/mutations';
import { useToast, useAuth } from '../../../../store';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const GoogleLoginButton = styled(Button)`
  width: 100%;
  border: 1px solid rgb(205, 209, 212);
  color: var(--color-dark);
`;

export const AuthSocial = () => {
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
            classtype="outline"
          />
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};
