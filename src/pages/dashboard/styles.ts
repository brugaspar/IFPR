import styled from "styled-components"

export const Container = styled.div`
  max-width: 1500px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button.sign-out {
    background: transparent;
    color: var(--text-title);
    font-size: 1.25rem;
    font-family: "Epilogue";

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 3rem;
    padding: 0 3rem;

    border: 1px solid var(--red);
    border-radius: 0.25rem;

    margin-top: 2rem;

    transition: background 0.2s;

    svg {
      color: var(--red);
      font-size: 1.25rem;
      margin-left: 3rem;
    }

    &:hover {
      background: rgba(255, 64, 64, 0.05);
    }
  }
`
