import { OPEN_CHEST, GIVE_UP, RESTART_GAME } from "./actionTypes";

export const openChest = (chestIndex) => ({
  type: OPEN_CHEST,
  payload: chestIndex,
});

export const giveUpGame = () => ({ type: GIVE_UP });

export const restartGame = () => ({ type: RESTART_GAME });
