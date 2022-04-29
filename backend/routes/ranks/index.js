const express = require("express");
const router = express.Router();
const { InGameUser, Ranking, User } = require("../../models");

/* 이번 주 순위 조회 */
router.post("/current-ranking", async (req, res) => {
    const gameTitle = req.body.gameTitle;

    const currentRankData = await InGameUser.findAll({
        order: [
            ["gameScore", "desc"], // 게임점수 내림차순
            ["updatedAt", "asc"], // 갱신시간 오름차순
        ],
        where: { game_title: gameTitle },
        include: {
            model: User,
            attributes: ["userName", "userImage"],
        },
    });

    res.send(currentRankData);
});

/* 역대 순위 조회 */
router.post("/past-ranking", async (req, res) => {
    const gameTitle = req.body.gameTitle;

    const pastRankData = await Ranking.findAll({
        where: { game_title: gameTitle, isApproved: true },
        include: {
            model: User,
            attributes: ["userName", "userImage"],
        },
    });

    res.send(pastRankData);
});

router.get("/", async (req, res) => {
    console.log("랭킹`");
    const rank = await Ranking.findAll({
        where: { isApproved: false },
        attributes: [
            "user_address",
            "ranking",
            "game_title",
            "isApproved",
            "isRewarded",
        ],
        order: [["game_title"], ["ranking"]],
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
    res.send("안녕");
});

module.exports = router;
