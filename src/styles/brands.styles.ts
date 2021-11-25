import { darken, transparentize } from "polished"
import styled from "styled-components"

export const Container = styled.div`
  height: calc(100vh - 7rem);
  width: calc(100vw - 5rem);
  padding: 2rem;
  overflow-x: hidden;
  margin: 7rem 0 0 5rem;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    h1 {
      font-size: 1.8rem;
      font-weight: 400;
    }

    button {
      display: flex;
      align-items: center;
      border: 0;
      border-radius: 0.25rem;
      padding: 0.6rem 0.8rem;

      font-family: "Epilogue";
      font-size: 1rem;
      background: var(--green);
      color: var(--background);

      transition: filter 0.2s;

      svg {
        margin-right: 0.5rem;
      }

      &:hover {
        filter: brightness(0.8);
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 3rem;
      left: 0;
      width: 100%;
      border-bottom: 1px solid var(--text-body);
    }
  }

  .filterSection {
    .headerOptions {
      position: relative;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      height: 4rem;

      .filterBttn {
        background: ${darken(0.03, "#232323")};
        color: white;
        border: none;
        height: 3rem;
        width: 6.5rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        font-family: "Mukta";

        .faChevronDownIcon {
          float: right;
          margin-right: 1rem;
          margin-top: 0.3rem;
        }
      }

      .ho {
        align-self: center;
        position: flex;

        &.cbActive {
          vertical-align: middle;
          margin-left: 1rem;
          margin-top: -1.2rem;
          float: left;
        }

        &.searchBar {
          margin-left: 15rem;
          flex-direction: row;
          float: left;
        }

        &.bttnFilters {
          float: left;
          margin-left: 1.5rem;
          color: white;
        }
      }
    }
  }

  .scroll-div {
    overflow-x: auto;
    height: calc(100vh - 24rem);
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
      /* cursor: pointer; */

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

  .paginationDiv{
      padding-left:2rem;  
      margin-top:0.5rem;   
      width:90%;
      height:2rem;
    }
`
