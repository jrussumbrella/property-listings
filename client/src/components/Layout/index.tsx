import React from "react";
import { GlobalStyle } from "../../lib";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Main = styled.main`
  min-height: 80vh;
`;

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
