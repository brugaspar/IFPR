import styled from "styled-components"

export const Container = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .permissions-container {
    height: calc(100vh - 22rem);
    margin: 2rem 0;
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
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

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
