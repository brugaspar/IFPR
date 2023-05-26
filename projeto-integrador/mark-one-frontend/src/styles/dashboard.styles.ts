import styled from "styled-components"

export const Container = styled.div`
  height: calc(100vh - 7rem);
  width: calc(100vw - 5rem);
  padding: 2rem;

  margin: 7rem 0 0 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .username {
    /* position: absolute;
    top: 10rem;
    left: 8rem; */

    margin-top: -10rem;
    margin-bottom: 5rem;
    margin-left: 2rem;

    span {
      color: var(--green);
    }

    p {
      font-size: 1.2rem;
      margin-top: 0.5rem;
    }
  }

  .card-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 9rem;
    overflow: hidden;

    + .card-container {
      margin-top: 5rem;
    }
  }
`

export const Card = styled.div`
  background: var(--shape-dark);
  padding: 2rem;
  border-radius: 2rem;

  flex: 1;

  display: flex;
  align-items: center;

  cursor: pointer;
  transition: filter 0.2s;

  height: 100%;

  svg {
    font-size: 3.5rem;
  }

  .content {
    margin-left: 2rem;

    h2 {
      color: white;
      font-family: "Mukta";
      color: var(--text-body);
    }

    span {
      color: var(--blue);
    }

    .highlight {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text-title);
    }
  }

  &:hover {
    filter: brightness(0.8);
  }
`
