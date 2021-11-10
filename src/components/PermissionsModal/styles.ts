import styled from "styled-components"

export const Container = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .permissions-options {
    margin: 2rem 0;

    button {
      height: 2rem;
      padding: 0 0.5rem;
      border-radius: 0.25rem;
      font-size: 1rem;

      background: var(--green);
      color: var(--text-dark);

      transition: filter 0.2s;

      border: 0;

      + button {
        margin-left: 1rem;
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  .permissions-container {
    height: calc(100vh - 23.5rem);
    overflow-y: scroll;

    .permissions-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 1.5rem 0 0;

      h3 {
        font-size: 1.1rem;
        font-weight: 400;
      }

      + .permissions-item {
        margin-top: 1.5rem;
      }
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--background);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2rem;
      border: 3px solid var(--text-body);
    }
  }

  .close {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: var(--background);

    button {
      height: 3rem;
      width: 100%;
      border-radius: 0.25rem;
      font-size: 1rem;

      background: transparent;
      color: var(--text-title);

      transition: filter 0.2s;

      /* border: 1px solid rgba(255, 0, 0, 0.2); */
      /* background: rgba(255, 0, 0, 0.05); */
      border: 1px solid var(--text-title);

      + button {
        margin-left: 1rem;
      }

      &.save-button {
        background: var(--green);
        color: var(--background);
        border: 0;
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`

export const CopyContainer = styled.div`
  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  select {
    height: 3rem;
    padding: 0 0.625rem;
    font-family: "Mukta";
    background: var(--shape-dark);
    color: var(--text-title);
    border-radius: 0.25rem;
    border: 0;
    width: 100%;
    outline: none;
  }

  button {
    height: 3rem;
    width: 100%;
    border-radius: 0.25rem;
    font-size: 1rem;

    background: transparent;
    color: var(--text-title);

    transition: filter 0.2s;

    border: 1px solid var(--text-title);

    margin-top: 1rem;

    &:hover {
      filter: brightness(0.8);
    }
  }
`
