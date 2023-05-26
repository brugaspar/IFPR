import { darken, transparentize } from "polished"
import styled from "styled-components"

export const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 1rem;
  padding-left: 1rem;
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

    .add-button {
      height: 3rem;
      width: 100%;
      background: var(--blue);
      border: 0;
      border-radius: 0.25rem;
      margin-top: 2rem;
      font-size: 1rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
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

  .scroll-div {
    overflow-x: auto;
    margin-top: 2rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--shape-dark);
      border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.25rem;
      background: var(--text-dark);
      border: 3px solid ${darken(0.16, "#323232")};
    }
  }

  .styled-table {
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 1rem;
    font-family: "Mukta";
    min-width: 400px;
    width: 100%;

    thead tr {
      background-color: var(--shape-dark);
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      padding: 0.75rem 0.9395rem;

      &.row {
        display: flex;

        gap: 0.8rem;
      }

      &:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }

    tbody tr {
      button.edit {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        width: 100%;
      }

      transition: filter 0.2s;

      &.active-row {
        font-weight: bold;
        color: var(--green);
      }

      &:nth-of-type(even) {
        background: ${transparentize(0.9, "#a1a3a5")};
      }

      &:last-of-type {
        border-bottom: 2px solid var(--green);
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`

export const RowContainer = styled.div<{ width?: number; align?: string }>`
  width: ${(props) => (props.width ? props.width : 49)}%;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.align ? props.align : "auto")};

  .permissions-button {
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
