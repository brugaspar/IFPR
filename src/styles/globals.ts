import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #121214;
    --background-light: #f1f3f5;
    --red: #e52e4d;
    --purple: #5429cc;
    --purple-light: #6933ff;
    --text-title: #f1f3f5;
    --text-body: #a1a3a5;
    --text-dark: #323232;
    --shape: #ffffff;
    --green: #26B886;
    --yellow: #eba417;
    --cyan: #61dafb;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media(max-width: 1080px) {
      font-size: 93.75%;
    }

    @media(max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    color: var(--text-body);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: "Mukta", sans-serif;
    font-weight: 400;
    outline: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: "Epilogue", sans-serif;
    font-weight: 700;
    color: var(--text-title);
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`