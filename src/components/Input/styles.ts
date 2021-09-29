import styled from "styled-components"

export const Container = styled.div`
  display: inline-flex;
  align-items: center;

  background: var(--shape);
  width: 100%;

  border-radius: 0.25rem;

  i {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 100%;
    height: 3rem;
    background: var(--shape);
    border-radius: 0.25rem;
    border: 0;
    padding: 0 0.625rem;

    font-size: 1rem;
    color: var(--background);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    background: var(--shape);

    width: 10%;
    height: 3rem;
    border-radius: 0.25rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`