import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider, ToastProvider, ModalProvider } from "./store";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import cookie from "js-cookie";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  request: (operation) => {
    const token = cookie.get("token") || "";
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
        <ToastProvider>
          <AuthProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
