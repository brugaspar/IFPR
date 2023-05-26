import styled from "styled-components";

export const Container = styled.div`
  background: #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  .content {
    background: #ffffff;
    padding: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    width: 400px;

    p {
      font-size: 1.2rem;
      font-family: Arial, Helvetica, sans-serif;
      text-align: center;
      margin: 1rem 0;
      font-weight: 600;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        border: 1px solid #dddddd;
        border-radius: 4px;
        height: 3rem;
        padding: 1rem;
        font-size: 1.2rem;
      }

      button {
        height: 3rem;
        border: none;
        background: #1df780;
        color: #202020;
        font-size: 1.4rem;
        border-radius: 4px;
        cursor: pointer;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`;
