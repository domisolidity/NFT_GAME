import { useState, useEffect } from "react";

import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        // if now 0 found in this row -> the row needs to be cleared as it is filled
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);

          //adding empty array on the top
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        //pushing current row at the bottom
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      // first flush the stage
      //todo: convert to for loop
      const newStage = prevStage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)));

      // draw tetromino. how?
      // player.pos.(x,y) is the top-left location of player. The tetromino starts from that point (location). If tetromino collided, update it to merge to prevent it from resetting in next updateStage
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value === 0) return;

          newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? "merged" : "clear"}`];
        });
      });

      //check if didCollided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
