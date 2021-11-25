import styled from "styled-components"

export const Container = styled.div`
  float: right;

  .pagination-bar {
    display: flex;
    align-items: center;
    justify-content: center;

    .pagination-bar-button {
      background: var(--shape-dark);
      border: 0;
      border-radius: 0.25rem;
      padding: 0.5rem;
      color: var(--text-body);
      font-family: "Epilogue";
      font-size: 1rem;

      + .pagination-bar-button {
        margin-left: 0.5rem;
      }

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`
