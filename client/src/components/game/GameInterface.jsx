import axios from "axios";

const gameList = [
  {
    id: 1, // 사진 출력용
    gameTitle: "블록쌓기",
    requestAddress: "stacking-blocks",
  },
  { id: 2, gameTitle: "테트리스", requestAddress: "tetris" },
  { id: 3, gameTitle: "보물찾기", requestAddress: "asdf" },
];

// const getReqAddress = (gameTitle) => {
//   switch (gameTitle) {
//     case gameList[0].gameTitle:
//       return gameList[0].requestAddress;
//     case gameList[1].gameTitle:
//       return gameList[1].requestAddress;
//     default:
//       break;
//   }
// };

/* 첫참여 시 참여자 행 초기화 */
const setParticipant = async (account, auth, gameTitle) => {
  if (!(account && auth && gameTitle)) return;
  const response = await axios
    .post(`/api/games`, { account: account, gameTitle: gameTitle })
    .catch((err) => console.log(err));
  return response;
};

/* 남은 기회 가져오기 */
const getMyChance = async (account, auth, gameTitle) => {
  if (!(account && auth && gameTitle)) return;
  const response = await axios
    .post(`/api/games/my-count`, { account: account, gameTitle: gameTitle })
    .catch((err) => console.log(err));
  return response.data.gameCount;
};

/* 최고기록 가져오기 */
const getMyBestScore = async (account, auth, gameTitle) => {
  if (!(account && auth && gameTitle)) return;
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
const usingItem = async (account, itemName, gameTitle) => {
  const response = await axios
    .post(`/api/items/game-items/using-item`, {
      account: account,
      itemName: itemName,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  return response.data;
};

/* 아이템 효과 받아오기 */
// const getItemEffect = async (recivedItemEffect) => {
//   setItemEffect(recivedItemEffect);
// };

/* 게임 기회 차감하기 */
const minusGameCount = async (account, gameTitle) => {
  if (!(account && gameTitle)) return;

  const response = await axios
    .post(`/api/games/minus-count`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));

  return response.data.gameCount;
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
  gameList,
  setParticipant,
  getMyChance,
  getMyBestScore,
  getGameItems,
  usingItem,
  getMyItemQuantity,
  minusGameCount,
  sendScore,
};
