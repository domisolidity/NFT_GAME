const express = require("express");
const router = express.Router();
const { User, Game, InGameUser, Ranking, Item, UserItem, MissionInUser, DailyMission } = require("../../models");
const { dailyMission, missionReg, missionAggregation } = require("../../config");

/* 게임목록 불러오기 */
router.get("/game-list", async (req, res) => {
  const response = await Game.findAll({}).catch((err) => console.log(err));
  res.send(response);
});

/* 첫 참여 때 InGameUser 테이블에 참여자 행 초기화 해주기 */
router.post("/set-participant", async (req, res) => {
  console.log("참여자 초기화");
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
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
  // 차감 전 기회가 0이면 false
  if (before.gameCount == 0) {
    res.send(false);
  } else {
    // 차감 전 횟수에 -1 해서 DB 갱신
    await InGameUser.update(
      { gameCount: before.gameCount - 1 },
      { where: { user_address: account, game_title: gameTitle } }
    );
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
  if (before.gameScore >= score) return;
  await InGameUser.update({ gameScore: score }, { where: { user_address: account, game_title: gameTitle } });
  const after = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: gameTitle },
  });
  res.send(after);
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
const myMission = async (account) => {
  const missions = await MissionInUser.findAll({
    where: { user_address: account },
    include: {
      model: DailyMission,
    },
  });
  return missions;
};

/* 일일미션 조회 */
router.post("/my-mission", async (req, res) => {
  console.log("미션 조회");
  const account = req.body.account;

  if (account) {
    const missions = await myMission(account);

    res.send(missions);
  } else {
    res.send("계정에 문제있음");
  }
});

/* 일일미션 등록 */
router.post("/mission-reg", async (req, res) => {
  console.log("미션 등록");
  const account = req.body.account;
  // const staking = req.body.staking;
  const staking = "green";

  if (account && staking) {
    const missions = await myMission(account);
    if (missions.length == 0) {
      // 선택된 NFT에 따라 미션 등록 1~3개 등록
      missionReg(account, staking);
      res.send("일일미션이 등록되었습니다");
    } else {
      console.log("일일미션이 이미 있음");
      res.send("일일미션이 이미 있음");
    }
  } else {
    res.send("스테이킹 또는 계정에 문제있음");
  }
});

module.exports = router;
