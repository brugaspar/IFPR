import styled from "styled-components"

type ContainerProps = {
  isSidebarOpen: boolean
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  height: 6rem;
  width: calc(100% - 5rem);
  margin-left: ${props => props.isSidebarOpen ? "18rem" : "5rem"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: margin 0.5s ease;

  button {
    position: absolute;
    top: 2rem;
    left: 2rem;

    border: 0;
    background: transparent;

    color: var(--text-title);

    svg {
      font-size: 2rem;
    }
  }
`