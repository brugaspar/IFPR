import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  button {
    border: none;
    background: red;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
