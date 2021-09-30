import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  width: 18rem;
  background: var(--shape-dark);

  z-index: 100;
  transition: all 0.5s ease;

  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem 0;

    img {
      width: 15rem;
      opacity: 1;
      transition: all 0.5s ease;
      overflow-x: visible;
    }

    span {
      width: 0;
      font-size: 2rem;
      color: var(--text-title);
      opacity: 0;
      transition: all 0.5s ease;
      overflow-x: hidden;
    }
  }

  &.close {
    width: 5rem;

    .logo-container {
      img {
        opacity: 0;
        overflow-x: hidden;
        width: 0;
      }

      span {
        opacity: 1;
        overflow-x: visible;
        width: auto;
      }
    }
  }
`