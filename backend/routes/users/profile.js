const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const jwt = require("express-jwt");

const { config } = require("../../config");

/** PATCH /api/profile/:userId */
/** Authenticated route */
router.patch("/:userId", jwt(config), async (req, res, next) => {
  // Only allow to fetch current user
  console.log(4);
  console.log(req.body);
  if (req.user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: "You can can only access yourself" });
  }
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) {
        return user;
      }
      Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => {
      return user
        ? res.json({ user: user, success: true })
        : res.status(401).send({
            error: `User with publicAddress ${req.params.userId} is not found in database`,
          });
    })
    .catch(next);
});

/* 대표 NFT 토큰id 받아오기 */
router.post("/my-token-id", async (req, res) => {
  console.log("대표 NFT 토큰 id 받아오기");
  const account = req.body.account;

  const response = await User.findOne({
    where: { publicAddress: account },
    attributes: ["mainNft"],
  });

  res.send(response);
});

/* 대표 NFT 등록 */
router.post("/reg-token-id", async (req, res) => {
  console.log("server: 대표NFT 등록하기");
  const account = req.body.account;
  const tokenId = req.body.tokenId;

  const response = await User.update(
    { mainNft: tokenId },
    { where: { publicAddress: account } }
  );

  res.send(response);
});

module.exports = router;
