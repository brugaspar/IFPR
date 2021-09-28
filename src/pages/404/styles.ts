import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  img {
    width: 40rem;
  }

  h1 {
    font-size: 2.5rem;
    margin: 4rem 0 ;
  }

  button {
    padding: 1.5rem 1rem;
    border-radius: 0.25rem;
    border: 0;
    background: var(--green);
    font-size: 1.25rem;
    font-family: "Epilogue";

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`