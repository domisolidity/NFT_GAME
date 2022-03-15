const express = require("express");
const router = express.Router();
const { User, Game, InGameUser, Item, UserItem } = require("../../../models");
const bcrypt = require("bcrypt");

// 게임 남은 기회 조회
router.post("/my-count", async (req, res) => {
  const account = req.body.account;
  const response = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: "블록쌓기" },
  }).catch((err) => console.log(err));
  res.send(response);
});

// 내 최고기록 조회
router.post("/my-best-score", async (req, res) => {
  const account = req.body.account;
  const response = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: "블록쌓기" },
  }).catch((err) => console.log(err));
  res.send(response);
});

// 기회 1회 차감
router.post("/minus-count", async (req, res) => {
  const account = req.body.account;
  // 차감 전 횟수 DB에서 가져오기
  const before = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: "블록쌓기" },
  });
  // 차감 전 횟수에 -1 해서 DB 갱신
  await InGameUser.update(
    { gameCount: before.gameCount - 1 },
    { where: { user_address: account, game_title: "블록쌓기" } }
  );
  // 차감 후 횟수 DB에서 가져오기
  const after = await InGameUser.findOne({
    attributes: ["gameCount"],
    where: { user_address: account, game_title: "블록쌓기" },
  });
  res.send(after);
});

// 점수 등록(게임 점수 받아서 해당 유저 점수 업데이트)
router.post("/send-score", async (req, res) => {
  const account = req.body.account;
  const score = req.body.score;
  const before = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: "블록쌓기" },
  });
  if (before.gameScore > score) return;
  await InGameUser.update({ gameScore: score }, { where: { user_address: account, game_title: "블록쌓기" } });
  const after = await InGameUser.findOne({
    attributes: ["gameScore"],
    where: { user_address: account, game_title: "블록쌓기" },
  });
  res.send(after);
});

module.exports = router;
