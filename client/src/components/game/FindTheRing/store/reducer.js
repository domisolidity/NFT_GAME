import { OPEN_CHEST, RESTART_GAME } from './actionTypes';
import { CHEST_COUNT, MAX_ATTEMPTS, GameStatus } from '../consts';
import { createChests, countOpenedChests, getChestWithRing } from '../utils';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case OPEN_CHEST:
      if (state.gameStatus === GameStatus.IN_PROGRESS) {
        const newState = { ...state };
        const targetChest = newState.chests[payload];
        targetChest.isOpen = true;
        if (targetChest.hasRing) {
          newState.gameStatus = GameStatus.VICTORY;
        } else if (countOpenedChests(newState.chests) === MAX_ATTEMPTS) {
          newState.gameStatus = GameStatus.DEFEAT;
          getChestWithRing(newState.chests).isOpen = true;
        }
        return newState;
      }
      return state;

    case RESTART_GAME:
      return {
        ...state,
        chests: createChests(CHEST_COUNT),
        gameStatus: GameStatus.IN_PROGRESS,
      };

    default:
      return state;
  }
};

export default reducer;
