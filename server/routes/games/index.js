const express = require("express");
const router = express.Router();

const ranking = require("./ranking/ranking");
const stackingBlocks = require("./stackingBlocks/stackingBlocks");

/* 랭킹 */
router.use("/ranking", ranking);

/* 블록쌓기게임 */
router.use("/stacking-blocks", stackingBlocks);

module.exports = router;
