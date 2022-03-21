const express = require("express");
const router = express.Router();
const { User, Game, InGameUser, Item, UserItem } = require("../../models");

const ranking = require("./ranking/ranking");
const stackingBlocks = require("./stackingBlocks/stackingBlocks");

/* 랭킹 */
router.use("/ranking", ranking);

/* 블록쌓기게임 */
router.use("/stacking-blocks", stackingBlocks);

/* 첫 참여 때 InGameUser 테이블에 참여자 행 초기화 해주기 */
router.post("/", async (req, res) => {
  console.log("참여자 초기화");
  if (!req.body) return;
  const account = req.body.account;
  const gameTitle = req.body.gameTitle;
  const response = await InGameUser.findOne({
    where: { user_address: account, game_title: gameTitle },
  }).catch((err) => console.log(err));

  // 이번 주 차 게임에 참여한 기록이 없으면 DB에 생성해주기
  if (!response) await InGameUser.create({ user_address: account, game_title: gameTitle });
  res.send("참여기록 초기화");
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
  // 차감 전 횟수에 -1 해서 DB 갱신
  await InGameUser.update(
    { gameCount: before.gameCount - 1 },
    { where: { user_address: account, game_title: gameTitle } }
  );
  // 차감 후 횟수 DB에서 가져오기
  const after = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: gameTitle },
  });
  res.send(after);
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

module.exports = router;
