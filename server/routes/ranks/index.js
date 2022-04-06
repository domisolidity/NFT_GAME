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

router.get("/",async (req,res)=>{
  console.log("랭킹`");
  const rank = await Ranking.findAll({
    attributes: ['user_address','ranking','game_title','gameScore'],
    order:[['game_title'],['ranking']]
  })
  res.send(rank)
})

// 클레임 허용 완료한 계정에 대해 랭크 삭제
router.post("/deleteRank", async(req,res)=>{

  const rank = req.body.rank;
  for (let i = 0; i < rank.length ; i++) {
    await Ranking.destroy({
      where: {
          game_title:rank[i][2],
          ranking: rank[i][1],
          user_address: rank[i][0]
        }
      })
      
    }
    res.send("삭제 완료")
})

module.exports = router;
