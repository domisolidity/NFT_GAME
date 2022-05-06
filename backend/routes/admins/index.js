const express = require("express");
const router = express.Router();
const { rankAggregation, missionAggregation } = require("../../config");

/* 순위집계 */
router.get("/rank-aggregation", async (req, res) => {
  await rankAggregation().then(res.send("순위집계완료"));
});
/* 일일미션집계 */
router.get("/mission-aggregation", async (req, res) => {
  await missionAggregation().then(res.send("일일미션집계완료"));
});

module.exports = router;
