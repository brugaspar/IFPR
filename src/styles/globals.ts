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
    --shape-dark: #232323;
    --green: #26B886;
    --yellow: #eba417;
    --cyan: #61dafb;
    --blue: #478ad1;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media(max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media(max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    color: var(--text-body);
    -webkit-font-smoothing: antialiased;
  }

  button {
    &:focus {
      box-shadow: 0 0 5px var(--green);
    }
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

  table{
    th {
      white-space: nowrap;
      user-select: none;

      svg {
        margin-left: 0.5rem;
        margin-bottom: -0.1rem;
        font-size: 0.8rem;
      }

      &.desc {
        svg {
          transform: rotate(180deg)
        }
      }
    }
  }

  button {
    cursor: pointer;
  }

  /* input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: var(--text-title);
  } */

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 800px;

    max-height: calc(100% - 7rem);

    background: var(--background);

    padding: 3rem;
    position: relative;

    border-radius: 0.25rem;

    outline: 0;
  }

  .react-modal-permissions-content {
    width: 100%;
    height: calc(100vh - 8rem);

    max-width: 800px;
    margin-top: 7rem;

    background: var(--background);

    padding: 3rem;
    position: relative;

    border-radius: 0.25rem;

    outline: 0;
  }

  .react-modal-content-small {
    width: 100%;
    max-width: 500px;

    max-height: calc(100% - 7rem);

    background: var(--background);

    padding: 2rem;
    position: relative;

    border-radius: 0.25rem;

    outline: 0;
  }

  .react-modal-content-address {
    width: 100%;
    max-width: 1000px;

    margin-top: 5rem;

    max-height: calc(100% - 7rem);

    background: var(--background);

    padding: 3rem;
    position: relative;

    border-radius: 0.25rem;

    outline: 0;
  }

`
