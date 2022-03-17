const express = require("express");
const router = express.Router();

const gameItems = require("./gameItems/gameItems");

/* 게임아이템 */
router.use("/game-items", gameItems);

module.exports = router;
