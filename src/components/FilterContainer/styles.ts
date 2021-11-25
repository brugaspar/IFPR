import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  .left {
    margin-left: 2rem;
  }

  .bottom {
    margin-bottom: 1rem;
  }

  .filter {
    background: var(--shape-dark);
    border: 0;
    height: 3rem;
    border-radius: 0.25rem;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family: "Epilogue";
    font-size: 1rem;
    color: var(--text-title);

    svg {
      margin-left: 1rem;
    }
  }
`
