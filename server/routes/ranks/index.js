const express = require("express");
const router = express.Router();
const { InGameUser, Ranking } = require("../../models");

/* 이번 주 순위 조회 */
router.post("/current-ranking", async (req, res) => {
  const gameTitle = req.body.gameTitle;

  const currentRankData = await InGameUser.findAll({
    raw: true,
    order: [
      ["gameScore", "desc"], // 게임점수 내림차순
      ["updatedAt", "asc"], // 갱신시간 오름차순
    ],
    where: { game_title: gameTitle },
  });

  res.send(currentRankData);
});

/* 역대 순위 조회 */
router.post("/past-ranking", async (req, res) => {
  const gameTitle = req.body.gameTitle;

  const pastRankData = await Ranking.findAll({
    raw: true,
    where: { game_title: gameTitle },
  });

  res.send(pastRankData);
});

module.exports = router;
