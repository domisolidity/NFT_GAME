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

// exports.csrfProtectionF = (req, res, next) => {

//   // 모든 요청에 CSRF 토큰을 저장
//   res.cookie('XSRF-TOKEN', req.csrfToken(), {
//     expires: new Date(Date.now() + 3 * 3600000) // 3시간 동안 유효
//   });

//   // 데이터 리턴
//   res.json();

//   next();

// };

