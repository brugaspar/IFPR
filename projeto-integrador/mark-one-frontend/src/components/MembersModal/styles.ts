import styled from "styled-components"

export const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 1rem;
  padding-left: 1rem;

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

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
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

      + .row {
        margin-top: 1rem;
      }
    }

    input,
    select {
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
        width: 100%;
        border-radius: 0.25rem;
        font-size: 1rem;

        background: transparent;
        color: var(--text-title);

        transition: filter 0.2s;

        border: 1px solid var(--text-title);

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

export const RowContainer = styled.div<{ width?: number; align?: string }>`
  width: ${(props) => (props.width ? props.width : 49)}%;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? props.align : "auto")};

  .addresses-button {
    height: 3rem;
    width: 100%;
    border: 0;
    border-radius: 0.25rem;

    background: var(--shape-dark);
    color: var(--text-title);
    font-size: 16px;

    margin-top: 1.85rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  &.margin-top {
    margin-top: 0.8rem;
  }
`
