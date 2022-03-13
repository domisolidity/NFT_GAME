const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { sequelize } = require("./models");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const passportConfig = require("./middleware/passport");

const indexRouter = require("./routes/index");
const passport = require("passport");
//const csrf = require('csurf');
// const { csrfProtectionF } = require("./middleware/middwares");

const app = express();

passportConfig();

/* 시퀄라이즈 연결 */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`디비 서버 포트 : ${process.env.MYSQL_PORT_DEVELOPMENT} 연결`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// // CSRF 미들웨어 인스턴스 생성
// const csrfProtection = csrf({ cookie: true });
//app.use(csrf({ cookie: true }));

app.use(passport.initialize());
app.use(passport.session());

//라우터 연결
app.use("/api", indexRouter); //csrfProtection, csrfProtectionF, indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
