import styled from "styled-components"

export const Container = styled.button`
  display: flex;
  align-items: center;
  background: var(--background);
  border: 0;
  border-radius: 0.25rem;
  margin-top: 1rem;

  transition: filter 0.2s;

  h5 {
    font-weight: 400;
    font-size: 1rem;
    margin-left: 1rem;
    margin-top: 0.3rem;
  }

  &:hover {
    filter: brightness(0.8);
  }
`
