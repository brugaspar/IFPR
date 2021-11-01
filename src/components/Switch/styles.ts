import styled from "styled-components"

export const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 3.2rem;
  height: 1.2rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background: var(--green);
    }

    &:checked + .slider::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    &:focus + .slider {
      box-shadow: 0 0 1px var(--green);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &.round {
      border-radius: 1.2rem;

      &::before {
        border-radius: 50%;
      }
    }

    &::before {
      position: absolute;
      content: "";
      height: 1.1rem;
      width: 1.1rem;
      left: 0.25rem;
      bottom: 0.05rem;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
`
