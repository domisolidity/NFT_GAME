import styled from "styled-components";

export const StyledStartButton = styled.div`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  min-height: 30px;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  button {
    width: 100%;
    height: 100%;
  }
  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
