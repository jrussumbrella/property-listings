import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import cookie from 'js-cookie';
import { GlobalStyle } from 'styles/globalStyles';
import { AuthProvider, ToastProvider } from 'contexts';
import TagManager from 'react-gtm-module';
import { API_URL, GTM_ID } from 'utils/constants';
import Toast from 'components/Toast';
import theme from './utils/theme';
import App from './App';

const client = new ApolloClient({
  uri: API_URL,
  request: (operation) => {
    const token = cookie.get('token') || '';
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
});

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastProvider>
          <Toast />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
