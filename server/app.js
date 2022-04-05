const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./models");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const databaseConfig = require("./config");

const indexRouter = require("./routes/index");

//const csrf = require('csurf');
// const { csrfProtectionF } = require("./middleware/middwares");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const itemsRouter = require("./routes/items");
const ranksRouter = require("./routes/ranks");

/* 시퀄라이즈 연결 */
sequelize
  .sync({ force: false })
  .then(async () => {
    console.log(`디비 서버 포트 : ${process.env.MYSQL_PORT_DEVELOPMENT} 연결`);
    databaseConfig.getDatabaseConfig(); // 기본 데이터베이스 세팅 (테스트용 포함)
    databaseConfig.weeklySchedule(); // 매주 주간 순위 집계를 위한 스케줄
    databaseConfig.dailylySchedule(); // 매일 일일미션 달성여부 체크를 위한 스케줄
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(cors());
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

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/items", itemsRouter);
app.use("/ranks", ranksRouter);
//////////////////

//라우터 연결
// app.use("/api", indexRouter); //csrfProtection, csrfProtectionF, indexRouter);

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
