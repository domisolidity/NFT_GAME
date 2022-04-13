const express = require("express");
const router = express.Router();
const { Game, InGameUser, Ranking, MissionInUser, DailyMission, ClosingMission } = require("../../models");
const { missionReg, initChance } = require("../../config");
const Sequelize = require("sequelize");
/* 게임목록 불러오기 */
router.get("/game-list", async (req, res) => {
  const response = await Game.findAll({}).catch((err) => console.log(err));
  res.send(response);
});

/* 첫 참여 때 InGameUser 테이블에 참여자 행 초기화 해주기 */
router.post("/set-participant", async (req, res) => {
  console.log("server: 참여자 초기화");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  // 게임 참여현황 테이블에 본인address와 현재 참여 중인 게임 정보 있는지 찾기
  const response = await InGameUser.findOne({
    where: { user_address: account, game_title: gameTitle },
  }).catch((err) => console.log(err));

  // 이번 주 차 게임에 참여한 기록이 없으면 DB에 생성해주기
  if (!response) {
    await InGameUser.create({ user_address: account, game_title: gameTitle });
    res.send(true);
  } else {
    res.send(false);
  }
});

/* 대표 NFT에 따라 게임 횟수 채워주기 */
router.post("/init-chance", async (req, res) => {
  console.log("server: 참여횟수 초기화");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  const mainNFT = req.body.mainNFT;
  // 게임 참여현황 테이블에 본인address와 현재 참여 중인 게임 정보 있는지 찾기
  const response = await InGameUser.findOne({
    where: { user_address: account, game_title: gameTitle },
    attributes: ["gameCount"],
  }).catch((err) => console.log(err));

  // 횟수가 있으면 넘어가기
  if (response.gameCount != null) {
    res.send("이미 횟수 초기화 됐음");
    return;
  } else {
    await initChance(account, gameTitle, mainNFT);
    // await InGameUser.update({gameCount:}{ user_address: account, game_title: gameTitle });
    res.send("횟수 초기화했음");
  }
});

/* 게임 남은 기회 가져오기 */
router.post("/my-count", async (req, res) => {
  console.log("횟수 불러오기");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  const response = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: gameTitle },
  }).catch((err) => console.log(err));
  res.send(response);
});

/* 최고기록 가져오기 */
router.post("/my-best-score", async (req, res) => {
  console.log("기록 불러오기");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  const response = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: gameTitle },
  }).catch((err) => console.log(err));
  res.send(response);
});

/* 기회 1회 차감 */
router.post("/minus-count", async (req, res) => {
  console.log("횟수 차감");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  // 차감 전 횟수 DB에서 가져오기
  const before = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: gameTitle },
  });
  // 차감 전 기회가 0이면 안됨
  if (before.gameCount == 0) {
    res.send(false);
  } else {
    // 차감 전 횟수에 -1 해서 DB 갱신
    await InGameUser.decrement({ gameCount: 1 }, { where: { user_address: account, game_title: gameTitle } });
    // 차감 했으면 true
    res.send(true);
  }
});

/* 점수 등록 */
router.post("/send-score", async (req, res) => {
  console.log("점수 등록");
  // (게임 점수 받아서 해당 유저 점수 업데이트)
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  let score = req.body.score;
  const itemEffect = req.body.itemEffect;

  // 추가점수 주는 아이템 사용한 경우 입력된 점수에 가산
  if (itemEffect) score = Math.ceil(score * itemEffect);

  const before = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: gameTitle },
  });
  // 이전기록 >= 현재기록 이면 갱신할 필요가 없음
  if (before.gameScore >= score) {
    res.send("이전 점수가 더 높음");
  } else {
    await InGameUser.update({ gameScore: score }, { where: { user_address: account, game_title: gameTitle } });
    res.send("최고점수 갱신");
  }
});

router.get("/rank", async (req, res) => {
  console.log("랭킹`");
  const rank = await Ranking.findAll({
    attributes: ["user_address", "ranking", "game_title"],
    order: [["game_title"], ["ranking"]],
  });
  res.send(rank);
});

// 내 일일미션 정보 불러오기
const myMission = async (account, gameTitle) => {
  console.log("일일미션 DB에서 불러오자");
  let missions;
  if (gameTitle) {
    console.log("게임타이틀이 있을 때");
    missions = await MissionInUser.findOne({
      // 미션현황에서 자신의 미션 중에
      where: { user_address: account },
      include: {
        model: DailyMission, // 일일미션이
        // gameTitle과 같은것
        where: { game_title: gameTitle },
      },
    });
  } else {
    console.log("게임타이틀이 없을 때");
    missions = await MissionInUser.findAll({
      where: { user_address: account },
      include: {
        model: DailyMission,
      },
    });
  }
  return missions;
};

/* 일일미션 조회 */
router.post("/my-mission", async (req, res) => {
  console.log("미션 조회");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  // 게임 하나 골랐으면 해당 게임 미션 조회
  if (account && gameTitle) {
    const missions = await myMission(account, gameTitle);
    res.send(missions);
    // 게임 메인페이지면 전체 미션 조회
  } else if (account) {
    const missions = await myMission(account);
    res.send(missions);
  } else {
    res.send("계정에 문제있음");
  }
});

/* 일일미션 등록 */
router.post("/mission-reg", async (req, res) => {
  console.log("server:미션 등록");
  const account = req.body.account;
  const tokenId = req.body.tokenId;

  if (account && tokenId) {
    const missions = await myMission(account);
    if (missions.length == 0) {
      // 선택된 NFT에 따라 미션 등록 1~3개 등록
      await missionReg(account, tokenId);
      res.send("일일미션이 등록되었습니다");
    } else {
      console.log("일일미션이 이미 있음");
      res.send("일일미션이 이미 있음");
    }
  } else {
    res.send("스테이킹 또는 계정에 문제있음");
  }
});

/* 일일미션 달성 */
router.post("/update-mission", async (req, res) => {
  console.log("server:미션 달성");
  const account = req.body.account;
  const missionId = req.body.missionId;

  if (account && missionId) {
    // 해당 미션의 달성여부를 true로 변경
    MissionInUser.update(
      { attainment: true },
      {
        where: { user_address: account, mission_id: missionId },
      }
    );
  }
  res.send("일일미션 달성");
});

router.get("/mission-achiever", async (req, res) => {
  console.log("server : 미션 데이터 요청");
  const completeMission = await ClosingMission.findAll({
    attributes: ["user_address", [Sequelize.fn("COUNT", "user_address"), "count_mission"]],
    group: "user_address",
  });
  res.send(completeMission);
});
router.post("/delete-achiever", async (req, res) => {
  console.log("server : 미션 삭제 요청");
  const deleteMission = await ClosingMission.destroy();
});

module.exports = router;
