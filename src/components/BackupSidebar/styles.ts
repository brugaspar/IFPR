import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  width: 0;

  background: var(--shape-dark);

  z-index: 1;
  overflow-x: hidden;
  transition: 0.5s;

  .content {
    margin-top: 5rem;
  }

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;

    &:hover {
      color: #f1f1f1;
    }
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    border: 0;
    background: transparent;
    color: var(--text-title);

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  &.active {
    width: 250px;
  }
`