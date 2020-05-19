import React from "react";
import { GlobalStyle } from "../../lib";
import Header from "./Header";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </div>
  );
};
