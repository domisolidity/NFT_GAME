export const CHEST_COUNT = 100; // 보물상자 개수
export const MAX_ATTEMPTS = CHEST_COUNT - 20; // 열 수 있는 상자 개수

export const GameStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  DEFEAT: "DEFEAT",
  VICTORY: "VICTORY",
};

export const GameEndPhrases = {
  [GameStatus.DEFEAT]: "링을 찾지 못했어요!",
  [GameStatus.VICTORY]: "링을 발견했어요!",
};
