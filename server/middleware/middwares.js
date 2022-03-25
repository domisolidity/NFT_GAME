exports.isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  //로그인 상태인 경우
  if (req.isAuthenticated()) {
    console.log(1111);
    next();
  } else {
    return res.json({
      isAuth: false,
      error: true,
      message: "로그인 상태가 아닙니다.",
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.json({
      isAuth: true,
      error: false,
      message: "이미 로그인 상태입니다.",
    });
  }
};
