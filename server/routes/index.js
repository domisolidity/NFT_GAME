const express = require('express');
const router = express.Router();

const user = require('./users');
const music = require('./musics');

/* 사용자 정보 */
router.use("/users", user);

/* 음악 정보 */
router.use("/musics", music);

module.exports = router;
