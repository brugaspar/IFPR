import styled from "styled-components"

export const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked {
      + .slider {
        background: var(--green);

        &:before {
          -webkit-transform: translateX(30px);
          -ms-transform: translateX(30px);
          transform: translateX(30px);
        }
      }
    }

    &:focus {
      + .slider {
        box-shadow: 0 0 5px var(--green);
      }
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: var(--text-dark);

    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;

    &.round {
      border-radius: 32px;

      &::before {
        border-radius: 50%;
      }
    }

    &::before {
      position: absolute;
      content: "";

      height: 22px;
      width: 22px;

      left: 4px;
      bottom: 3px;

      background: var(--text-title);

      -webkit-transition: all 0.4s ease;
      transition: all 0.4s ease;
    }
  }
`
