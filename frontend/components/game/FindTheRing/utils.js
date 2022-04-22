import { random, range } from 'lodash';

export const createChests = (amount) => {
  const index = random(0, amount - 1);
  return range(amount).map((i) => createChest(i === index));
};

export const countOpenedChests = (chests) => {
  return chests.filter((chest) => chest.isOpen && !chest.hasRing).length;
};

export const getChestWithRing = (chests) => {
  return chests.find((chest) => chest.hasRing);
};

const createChest = (hasRing = false) => ({ hasRing, isOpen: false });
