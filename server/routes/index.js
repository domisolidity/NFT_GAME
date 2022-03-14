const express = require("express");
const router = express.Router();

const user = require("./users");
const auth = require("./auth");
const game = require("./games");

/* 사용자 정보 */
router.use("/auth", auth);

/* 음악 정보 */
router.use("/users", user);

/* 게임 */
router.use("/games", game);

module.exports = router;
