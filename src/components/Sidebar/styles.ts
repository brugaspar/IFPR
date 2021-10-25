import styled from "styled-components"
import { darken, transparentize } from "polished"

export const Container = styled.div`
  /* @keyframes fade-in {
    from {
      width: 5rem;
    }
    to {
      width: 15rem;
    }
  }

  @keyframes fade-out {
    from {
      width: 4rem;
    }
    to {
      width: 3.2rem;
    }
  } */

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

    height: 7rem;

    img.small-icon {
      width: 3.2rem;
      opacity: 0;
      pointer-events: none;
      display: none;
      /* animation: fade-out 0.3s normal forwards ease-in-out; */
    }

    img.icon {
      width: 15rem;
      /* animation: fade-in 0.3s normal forwards ease-in-out; */
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: calc(100% - 7rem);

    padding: 2rem 0;

    .list-container {
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      margin-bottom: 2rem;

      &::-webkit-scrollbar {
        width: 0.2rem;
      }

      &::-webkit-scrollbar-track {
        background: var(--background);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 2rem;
        border: 3px solid var(--text-body);
      }

      ul {
        padding: 0 1rem;

        li {
          display: flex;
          align-items: center;
          height: 3rem;

          list-style: none;
          background: var(--background);
          border-radius: 0.25rem;

          transition: background 0.2s;

          cursor: pointer;

          + li {
            margin-top: 0.5rem;
          }

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.7rem;
            font-size: 1.5rem;
          }

          .label {
            font-size: 1.25rem;
            margin-top: 0.2rem;
            margin-left: 1rem;
            white-space: nowrap;
          }

          &:hover {
            background: ${darken(0.05, "#121214")};
          }
        }
      }
    }

    .sign-out-container {
      width: 100%;

      ul {
        padding: 0 1rem;
        display: flex;
        align-items: center;

        .user-info {
          height: 3rem;
        }

        .name,
        .username {
          font-size: 1.2rem;
          margin-top: 0.2rem;
          margin-left: 1rem;
          white-space: nowrap;
        }

        .username {
          font-size: 1rem;
        }

        li {
          display: flex;
          align-items: center;
          height: 3rem;

          list-style: none;
          background: rgba(255, 64, 64, 0.05);
          border-radius: 0.25rem;

          transition: background 0.2s;

          cursor: pointer;

          border: 1px solid ${transparentize(0.7, "#ff4040")};

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 0.7rem;
            font-size: 1.5rem;
            color: var(--red);
          }

          &:hover {
            background: ${transparentize(0.8, "#ff4040")};
          }
        }
      }
    }
  }

  &.close {
    width: 5rem;

    .logo-container {
      img.small-icon {
        opacity: 1;
        pointer-events: auto;
        display: inline;
      }

      img.icon {
        opacity: 0;
        pointer-events: none;
        display: none;
      }
    }

    .list-container,
    .sign-out-container {
      ul {
        .name,
        .username {
          display: none;
          opacity: 0;
          pointer-events: none;
        }

        li {
          .label {
            display: none;
            opacity: 0;
            pointer-events: none;
          }
        }
      }
    }
  }
`
