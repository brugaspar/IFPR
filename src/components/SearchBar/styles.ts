import styled from "styled-components"

export const Container = styled.div`
  background: var(--shape-dark);
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 20rem;

  input {
    background: var(--shape-dark);
    color: var(--text-body);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;

    svg {
      font-size: 1.2rem;
    }
  }
`
