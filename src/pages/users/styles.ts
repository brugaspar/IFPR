import { darken, transparentize } from "polished"
import styled from "styled-components"

export const Container = styled.div`
  height: calc(100vh - 7rem);
  width: calc(100vw - 5rem);
  padding: 2rem;

  margin: 7rem 0 0 5rem;

  .title {
    font-size: 1.8rem;
    font-weight: 400;
    position: relative;

    margin-bottom: 2rem;

    &::after {
      content: "";
      position: absolute;
      top: 2.5rem;
      left: 0;
      width: 100%;
      border-bottom: 1px solid var(--text-body);
    }
  }

  .scroll-div {
    overflow-x: auto;
    height: calc(100vh - 15rem);

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

    thead tr {
      background-color: var(--shape-dark);
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      padding: 0.75rem 0.9395rem;

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
      cursor: pointer;

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
