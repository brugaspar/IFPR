import styled from "styled-components"
import { darken } from "polished"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 20rem;

  background: var(--shape-dark);

  transition: all 0.5s ease;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${darken(0.75, "#ffffff")};
    margin: 2rem 0;

    img.small-icon {
      width: 3.2rem;
      transition-delay: 0s;
      opacity: 0;
      pointer-events: none;
      display: none;
    }

    img.icon {
      width: 15rem;
      margin-bottom: 1rem;
    }
  }

  ul {
    li {
      display: flex;
      align-items: center;

      margin: 1rem 1rem;

      svg {
        font-size: 1.25rem;
        color: var(--text-title);
      }

      span {
        font-size: 1.5rem;
        margin-left: 1rem;
        color: var(--text-title);
      }
    }
  }

  &.close {
    width: 5rem;

    .logo-container {
      border: 1px solid transparent;

      img.small-icon {
        transition-delay: 1s;
        opacity: 1;
        pointer-events: auto;
        display: inline;
      }

      img.icon {
        transition-delay: 0s;
        opacity: 0;
        pointer-events: none;
        display: none;
      }
    }
  }
`
