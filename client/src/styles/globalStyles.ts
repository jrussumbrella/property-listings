import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }


  :root {
     --color-dark: #3d3d3d;
     --color-darker: #2e2d36;
     --color-primary: #e74c3c;
     --color-gray: #ececec;
     --color-dark-gray: #6c6c6c;
     --color-blue: #7b53c1;
     --color-light-gray: #9c99b6;
     --color-red: #e31b23;
  }

  
  body {
    font-family: 'Poppins', sans-serif;
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

  button, input, textarea {
    font-family: 'Poppins', sans-serif;
  }

  .overflow {
    overflow: hidden;
  }

  ul {
    list-style: none;
  }
 
`;
