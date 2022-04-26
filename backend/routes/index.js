const express = require("express");
const router = express.Router();

const user = require("./users");
const auth = require("./auth");
const game = require("./games");
const item = require("./items");
const rank = require("./ranks");
const admin = require("./admins");

/* 사용자 정보 */
router.use("/auth", auth);

/* 음악 정보 */
router.use("/users", user);

/* 게임 */
router.use("/games", game);

/* 아이템 */
router.use("/items", item);

/* 랭킹 */
router.use("/ranks", rank);

/* 관리자 */
router.use("/admins", admin);

module.exports = router;
