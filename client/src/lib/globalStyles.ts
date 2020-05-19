import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}


  :root {
     --color-dark: #3d3d3d;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    color: var(--color-dark);
    font-weight: 400;
    font-size: 15px;
  }

  a {
    text-decoration: none;
    color: var(--color-dark);
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.4rem;
  }
 
`;
