const express = require("express");
const router = express.Router();
const passport = require('passport');
const { User } = require("../../../models");

router.post("/", async (req, res, next) => {
  const login = await User.findOne({
    where: {
      address: req.body.address,
    }
  })

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      res.status(401).json({ success: false, message: err });
    }

    //미가입회원, 비밀번호 불일치
    if (info) {
      return res.json({ success: false, message: info.message });
    }

    return req.login(user, async (loginErr) => {
      //로그인 실패
      if (loginErr) {
        return res.status(400).json({ success: false, message: "login error" });
      }
      //로그인 성공
      return res.status(200).json({ success: true, message: "로그인 확인되었습니다. 페이지이동합니다.", userAddress: login.address });
    });


  })(req, res, next);
});

module.exports = router;
