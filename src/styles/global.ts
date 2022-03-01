import * as styled from "styled-components";

export const GlobalStyle = styled.createGlobalStyle`
  :root {
    --sidebar-width: 20rem;

    --background: #f1f3f5;
    --primary: #131313;
    --contrast: #232323;
    --green: #2e9e3f;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    color: var(--primary);
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  a {
    text-decoration: none;
  }

  button,
  input,
  textarea {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    cursor: not-allowed;
  }
`;
