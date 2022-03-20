import { OPEN_CHEST, RESTART_GAME } from "./actionTypes";

export const openChest = (chestIndex) => ({
  type: OPEN_CHEST,
  payload: chestIndex,
});

export const restartGame = () => ({ type: RESTART_GAME });
