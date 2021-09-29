import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  height: 6em;
  margin: 0 auto;
  padding: 0 2rem;

  img {
    width: 15rem;
  }

  button {
    display: flex;
    align-items: center;

    background: transparent;
    border: 0;

    transition: filter 0.2s;

    span {
      font-size: 1.25rem;
      font-family: "Epilogue";
      color: var(--text-title);
      font-weight: 400;
    }

    svg {
      margin-left: 1rem;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`