import styled from "styled-components"

export const Container = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  form {
    label {
      display: inline-block;
      margin-bottom: 0.2rem;

      + input {
        margin-bottom: 1.2rem;
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        width: 49%;
      }
    }

    input {
      width: 100%;
      height: 3rem;
      background: var(--shape-dark);
      border-radius: 0.25rem;
      border: 0;
      padding: 0 0.625rem;

      font-size: 1rem;
      color: var(--text-title);
    }

    .close {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        height: 3rem;
        /* padding: 0 1rem; */
        width: 100%;
        border-radius: 0.25rem;
        font-size: 1rem;

        background: transparent;
        color: var(--text-title);

        transition: filter 0.2s;

        border: 1px solid rgba(255, 0, 0, 0.2);
        background: rgba(255, 0, 0, 0.05);

        + button {
          margin-left: 1rem;
        }

        &[type="submit"] {
          background: var(--green);
          color: var(--background);
          border: 0;
        }

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`
