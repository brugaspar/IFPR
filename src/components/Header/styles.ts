import styled from "styled-components"

export const Container = styled.div<{ isSidebarOpen: boolean }>`
  position: fixed;
  height: 7rem;
  width: ${(props) => (props.isSidebarOpen ? "calc(100vw - 20rem)" : "calc(100vw - 5rem)")};
  margin-left: ${(props) => (props.isSidebarOpen ? "20rem" : "5rem")};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  background: var(--background);
  z-index: 999;

  border-bottom: 1px solid var(--shape-dark);

  transition: all 0.5s ease;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    border-radius: 0.25rem;
  }

  .company-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 1.25rem;
      font-weight: 400;
    }

    svg {
      margin-left: 2rem;
      font-size: 1.5rem;
    }
  }
`
