import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #fafbfc;
    color: #22223b;
    font-family: 'Fira Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
  h1, h2 {
    font-weight: 600;
    margin-top: 1.5em;
  }
`;

export default GlobalStyle;
