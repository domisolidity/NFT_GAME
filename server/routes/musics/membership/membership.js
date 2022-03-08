const express = require("express");
const router = express.Router();

router.post('/', async (req, res, next) => {
  console.log("membership/membership");
});

module.exports = router;
