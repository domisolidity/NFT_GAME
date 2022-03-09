const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ success: true, message: "로그아웃합니다." });
});

module.exports = router;
