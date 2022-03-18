import axios from "axios";

const gameList = [
  {
    id: 1,
    gameTitle: "블록쌓기",
    requestAddress: "stacking-blocks",
  },
  { id: 2, gameTitle: "테트리스", requestAddress: "tetris" },
];

const getReqAddress = (gameTitle) => {
  switch (gameTitle) {
    case gameList[0].gameTitle:
      return gameList[0].requestAddress;
    case gameList[1].gameTitle:
      return gameList[1].requestAddress;
    default:
      break;
  }
};

// 남은 기회 가져오기
const getMyChance = async (account, auth, requestAddress) => {
  if (!account || !auth) return;
  await axios
    .post(`/api/games/${requestAddress}/my-count`, { account: account })
    .then((res) => {
      return res.data.gameCount;
    })
    .catch((err) => console.log(err));
};

export default { gameList, getMyChance };
