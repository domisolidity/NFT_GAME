const express = require("express");
const router = express.Router();

const register = require("./log/register");
const login = require("./log/login");
const logout = require("./log/logout");

//const { isLoggedIn, isNotLoggedIn } = require("../../middleware/middwares");

/* 사용자 정보 */
router.use("/register", register);
// router.use("/login", isNotLoggedIn, login);
// router.use("/logout", isLoggedIn, logout);

//////////////////
const users = require("./log/users");

router.use("/", users);

module.exports = router;
