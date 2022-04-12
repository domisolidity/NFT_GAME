const express = require("express");
const router = express.Router();
const { User, Ranking, ClosingMission } = require("../../models");
const jwt = require("express-jwt");

const { config } = require("../../config");

/** GET /api/users */
router.get("/", async (req, res, next) => {
  console.log(1);
  // If a query string ?publicAddress=... is given, then filter results

  const whereClause =
    req.query && req.query.publicAddress
      ? {
          where: { publicAddress: req.query.publicAddress },
        }
      : undefined;

  return User.findAll(whereClause)
    .then((users) => res.json(users))
    .catch(next);
});

/** GET /api/users/:userId */
/** Authenticated route */
router.get("/:userId", jwt(config), async (req, res, next) => {
  console.log(2);
  if (req.user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: "You can can only access yourself" });
  }
  return User.findByPk(req.params.userId)
    .then((user) => res.json(user))
    .catch(next);
});

/** POST /api/users */
router.post("/", async (req, res, next) => {
  console.log(3);

  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

router.get("/claim_rank", async (req, res) => {
  const { account } = req.body;
  await Ranking.findAll({
    where: { user_address: account },
  })
    .then((data) => res.send(data))
    .catch(console.error());
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
    attributes: ["user_address", "ranking", "game_title", "isApproved", "isRewarded"],
  });
  res.send(rank);
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
          game_title: rank[i][2],
          ranking: rank[i][1],
        },
      }
    );
  }
});

// 클레임 허용 완료한 계정에 대해 랭크 삭제
router.post("/deleteMIsiion", async (req, res) => {
  const rank = req.body.rank;
  for (let i = 0; i < rank.length; i++) {
    await ClosingMission.destroy({
      where: {
        game_title: rank[i][2],
        ranking: rank[i][1],
        user_address: rank[i][0],
      },
    });
  }
  res.send("삭제 완료");
});

// /** PATCH /api/users/:userId */
// /** Authenticated route */
// router.patch("/:userId", jwt(config), async (req, res, next) => {
//   // Only allow to fetch current user
//   console.log(4)
//   if (req.user.payload.id !== +req.params.userId) {
//     return res.status(401).send({ error: "You can can only access yourself" });
//   }
//   return User.findByPk(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         return user;
//       }

//       Object.assign(user, req.body);
//       return user.save();
//     })
//     .then((user) => {
//       return user
//         ? res.json(user)
//         : res.status(401).send({
//           error: `User with publicAddress ${req.params.userId} is not found in database`,
//         });
//     })
//     .catch(next);
// });

module.exports = router;
