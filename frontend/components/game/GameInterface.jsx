import axios from "axios";
const { NEXT_PUBLIC_SERVER_URL } = process.env;
const gameList = [
  {
    gameId: 1,
    gameTitle: "블록쌓기",
    gameUrl: "stacking-blocks",
    description:
      "정확한 타이밍에 버튼을 눌러 블록을 최대한 높게 쌓아올리는 게임",
  },
  {
    gameId: 2,
    gameTitle: "테트리스",
    gameUrl: "tetris",
    description:
      "이리저리 방향을 돌려가며 빈칸이 생기지 않게 블록을 끼워 맞추는 게임",
  },
  {
    gameId: 3,
    gameTitle: "보물찾기",
    gameUrl: "treasure",
    description:
      "어디에 들었는지 알 수 없는 보물상자들을 최대한 적게 열어 보물을 찾는 게임",
  },
];

const getGameList = async () => {
  const response = await axios.get(`${NEXT_PUBLIC_SERVER_URL}/games/game-list`);
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
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/set-participant`, {
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

/* 첫 참여 시 대표 NFT에 맞게 횟수 초기화 */
const initChance = async (account, gameTitle, mainNFT) => {
  console.log("횟수 초기화");
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/init-chance`, {
      account: account,
      gameTitle: gameTitle,
      mainNFT: mainNFT,
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
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/my-count`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));

  return response.data.gameCount;
};

/* 최고기록 가져오기 */
const getMyBestScore = async (account, gameTitle) => {
  if (!(account && gameTitle)) return;
  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/my-best-score`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  return response.data.gameScore;
};

/* 아이템 목록 가져오기 */
const getGameItems = async () => {
  const response = await axios.get(
    `${NEXT_PUBLIC_SERVER_URL}/items/game-items`
  );
  return response.data;
};

/* 내 아이템 개수 불러오기 */
const getMyItemQuantity = async (account, itemName) => {
  const response = await axios.post(
    `${NEXT_PUBLIC_SERVER_URL}/items/game-items/my-items-quantity`,
    {
      account: account,
      itemName: itemName,
    }
  );

  return response.data.count;
};

/* 아이템 사용하기 */
const usingItem = async (account, itemName) => {
  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/items/game-items/using-item`, {
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
    .post(`${NEXT_PUBLIC_SERVER_URL}/items/game-items/get-item-effect`, {
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
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/minus-count`, {
      account: account,
      gameTitle: gameTitle,
    })
    .catch((err) => console.log(err));
  if (response) {
    console.log("게임 기회 차감됨");
  } else {
    console.log("게임 기회가 이미 0임");
  }
  return response;
};

/* 점수 등록(전송) */
const sendScore = async (account, gameTitle, score, itemEffect) => {
  if (!(account && gameTitle && score > 0)) return;

  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/send-score`, {
      account: account,
      gameTitle: gameTitle,
      score: parseInt(score),
      itemEffect: itemEffect,
    })
    .catch((err) => console.log(err));
  return response;
};

/* 대표 NFT 받아오기 */
const getMyNFT = async (account) => {
  if (!account) return;

  const mainNFT = await axios.post(
    `${NEXT_PUBLIC_SERVER_URL}/users/profile/my-token-id`,
    {
      account: account,
    }
  );
  const tokenId = mainNFT.data.mainNft;

  return tokenId;
};

/* 일일미션 받기 */
const missionReg = async (account, tokenId) => {
  if (!(account && tokenId)) return;

  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/mission-reg`, {
      account: account,
      tokenId: tokenId,
    })
    .catch((err) => console.log(err));
  console.log(response.data.length);
  return response.data;
};

/* 일일미션 불러오기 */
const getMission = async (account, gameTitle) => {
  if (!account) return;
  if (gameTitle) {
    const response = await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/games/my-mission`, {
        account: account,
        gameTitle: gameTitle,
      })
      .catch((err) => console.log(err));

    return response.data;
  } else {
    const response = await axios
      .post(`${NEXT_PUBLIC_SERVER_URL}/games/my-mission`, {
        account: account,
      })
      .catch((err) => console.log(err));

    return response.data;
  }
};

/* 미션현황 갱신 */
const updateMission = async (account, missionId) => {
  console.log("인터페이스:미션현황 갱신");
  if (!(account && missionId)) return;

  const response = await axios
    .post(`${NEXT_PUBLIC_SERVER_URL}/games/update-mission`, {
      account: account,
      missionId: missionId,
    })
    .catch((err) => console.log(err));

  console.log(response);
  return;
};

export default {
  getGameList,
  gameList,
  setParticipant,
  initChance,
  getMyChance,
  getMyBestScore,
  getGameItems,
  usingItem,
  getItemEffect,
  getMyItemQuantity,
  minusGameCount,
  sendScore,
  getMyNFT,
  missionReg,
  getMission,
  updateMission,
};
