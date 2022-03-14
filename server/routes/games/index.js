const express = require("express");
const router = express.Router();

const stackingBlocks = require("./stackingBlocks/stackingBlocks");

/* 블록쌓기게임 */
router.use("/stacking-blocks", stackingBlocks);

module.exports = router;
