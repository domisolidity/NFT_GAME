import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: ${(props) => (props.gameOver ? "center" : "")};
  position: ${(props) => (props.gameOver ? "absolute" : "")};
  top: ${(props) => (props.gameOver ? "20%" : "")};
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: ${(props) => (props.gameOver ? "2rem" : "0.8rem")};
`;
