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

router.get("/", async (req, res) => {
  console.log("랭킹`");
  const rank = await Ranking.findAll({
    where: { isApproved: false },
    attributes: ["user_address", "ranking", "game_title", "gameScore", "isApproved", "isRewarded"],
    order: [["game_title"], ["ranking"]],
  });
  res.send(rank);
});

// 클레임양 조회 요청
router.post("/claimable", async (req, res) => {
  const { data } = req.body;
  console.log("랭킹ssss`");
  const rank = await Ranking.findAll({
    where: {
      user_address: data,
      isApproved: true,
      isRewarded: false,
    },
    attributes: ["user_address", "ranking", "isApproved", "isRewarded", "game_title"],
  });
  res.send(rank);
});

router.post("/approved", async (req, res) => {
  const rank = req.body.rank;
  console.log(rank);
  for (let i = 0; i < rank.length; i++) {
    await Ranking.update(
      { isApproved: true },
      {
        where: {
          user_address: rank[i][0],
          game_title: rank[i][2],
          ranking: rank[i][1],
        },
      }
    );
  }
});
router.post("/rewarded", async (req, res) => {
  const { rank } = req.body;
  console.log(rank);
  for (let i = 0; i < rank.length; i++) {
    await Ranking.update(
      { isRewarded: true },
      {
        where: {
          user_address: rank[i][0],
          game_title: rank[i][4],
          ranking: rank[i][1],
        },
      }
    );
  }
});

// 클레임 허용 완료한 계정에 대해 랭크 삭제
router.post("/deleteRank", async (req, res) => {
  const rank = req.body.rank;
  for (let i = 0; i < rank.length; i++) {
    await Ranking.destroy({
      where: {
        game_title: rank[i][2],
        ranking: rank[i][1],
        user_address: rank[i][0],
      },
    });
  }
  res.send("삭제 완료");
});

module.exports = router;
