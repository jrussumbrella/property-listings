import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import cookie from 'js-cookie';
import { GlobalStyle } from 'styles/globalStyles';
import { AuthProvider, ToastProvider, ModalProvider } from 'globalState';
import { API_URL } from 'utils/constants';
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastProvider>
          <Toast />
          <AuthProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
