import axios from "axios";

const gameList = [];

const getGameList = async () => {
  const response = await axios.get(`/api/games/game-list`);
  const receivedGameList = response.data;
  if (gameList.length == receivedGameList.length) return;

  for (let i = gameList.length; i < receivedGameList.length; i++) {
    gameList.push(receivedGameList[i]);
  }
};

/* 첫참여 시 참여자 행 초기화 */
const setParticipant = async (account, gameTitle) => {
  console.log("참여자 초기화");
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`/api/games/set-participant`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  if (response) {
    console.log("참여자 초기화 됨");
  } else {
    console.log("이미 참여자 초기화 되어있음");
  }
  return;
};

/* 남은 기회 가져오기 */
const getMyChance = async (account, gameTitle) => {
  console.log("횟수 불러오기");
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`/api/games/my-count`, { account: account, gameTitle: gameTitle })
    .catch((err) => console.log(err));

  return response.data.gameCount;
};

/* 최고기록 가져오기 */
const getMyBestScore = async (account, gameTitle) => {
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`/api/games/my-best-score`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  return response.data.gameScore;
};

/* 아이템 목록 가져오기 */
const getGameItems = async () => {
  const response = await axios.get(`/api/items/game-items`);
  return response.data;
};

/* 내 아이템 개수 불러오기 */
const getMyItemQuantity = async (account, itemName) => {
  const response = await axios.post(`/api/items/game-items/my-items-quantity`, {
    account: account,
    itemName: itemName,
  });

  return response.data.count;
};

/* 아이템 사용하기 */
const usingItem = async (account, itemName) => {
  const response = await axios
    .post(`/api/items/game-items/using-item`, {
      account: account,
      itemName: itemName,
    })
    .catch((err) => console.log(err));
  if (response) {
    console.log("아이템 사용함");
    return true;
  } else {
    console.log("아이템이 없음");
    return false;
  }
};

/* 아이템 효과 받아오기 */
const getItemEffect = async (account, itemName, gameTitle) => {
  const response = await axios
    .post(`/api/items/game-items/get-item-effect`, {
      account: account,
      itemName: itemName,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));

  if (response.data) {
    return response.data;
  } else {
    console.log("아이템효과 받아오기 실패");
    return response.data;
  }
};

/* 게임 기회 차감하기 */
const minusGameCount = async (account, gameTitle) => {
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`/api/games/minus-count`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  if (response) {
    console.log("게임 기회 차감됨");
  } else {
    console.log("게임 기회가 이미 0임");
  }
  return;
};

/* 점수 등록(전송) */
const sendScore = async (account, gameTitle, score, itemEffect) => {
  console.log(account, gameTitle, score, itemEffect);
  if (!(account && gameTitle && score > 0)) return;

  const response = await axios
    .post(`/api/games/send-score`, {
      account: account,
      gameTitle: gameTitle,
      score: parseInt(score),
      itemEffect: itemEffect,
    })
    .catch((err) => console.log(err));
  return response;
};

export default {
  getGameList,
  gameList,
  setParticipant,
  getMyChance,
  getMyBestScore,
  getGameItems,
  usingItem,
  getItemEffect,
  getMyItemQuantity,
  minusGameCount,
  sendScore,
};
