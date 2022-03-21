import styled from "styled-components";

import bgImage from "../img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  cursor: default;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
