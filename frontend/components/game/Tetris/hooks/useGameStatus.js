import { useState, useEffect, useCallback } from "react";

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  // 한번에 지운 줄 수에 따라 기준 점수(1줄 40점, 2줄 100점...)
  const linePoints = [40, 100, 300, 1200];

  /* 점수 계산 */
  const calcScore = useCallback(() => {
    // 블록 놓았을 때 줄 지울게 없으면 아무것도 안하기
    if (rowsCleared <= 0) return;

    // 지워진 줄 수에 따라 점수 부여
    // 점수는 기존 점수에 지운 줄 기준점수에 레벨만큼 곱한값을 더해준다. 즉,
    // 이전점수 + 기준점수 * 레벨
    setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
    // 지금까지 지운 줄 수 누적
    setRows((prev) => prev + rowsCleared);
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
