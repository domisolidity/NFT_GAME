const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { sequelize, User, InGameUser, Game, Item, UserItem, Ranking } = require("./models");
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
  .then(async () => {
    console.log(`디비 서버 포트 : ${process.env.MYSQL_PORT_DEVELOPMENT} 연결`);
    // DB 초기 세팅 (테스트 계정, 블록게임, 아이템 생성)
    if ((await User.findAll()).length == 0) {
      await User.create({
        userName: "고길동",
        publicAddress: "0xfa55215946f348d884b8c017448416a55c840404",
      });
      await User.create({
        userName: "둘리",
        publicAddress: "0x861efdf405b70b30388bdf2ad1ff3940e2d0b838",
      });
    }
    if ((await Game.findAll()).length == 0)
      await Game.create({
        title: "블록쌓기",
        description: "스르륵 움직이는 블록을 단단히 고정된 블록에 정확한 순간에 착 놓아서 쑥쑥 높게 쌓아올리는 게임",
      });
    if ((await InGameUser.findAll()).length == 0) {
      await InGameUser.create({
        user_address: "0xfa55215946f348d884b8c017448416a55c840404",
        game_title: "블록쌓기",
      });
      await InGameUser.create({
        user_address: "0x861efdf405b70b30388bdf2ad1ff3940e2d0b838",
        game_title: "블록쌓기",
        gameScore: 3,
      });
    }
    if ((await Item.findAll()).length == 0) {
      await Item.create({
        itemName: "아쉬워",
        itemPrice: 1,
        itemDescription: "잔여 횟수가 1 증가한다",
      });
      await Item.create({
        itemName: "겜돌이",
        itemPrice: 4,
        itemDescription: "잔여 횟수가 5 증가한다",
      });
      await Item.create({
        itemName: "중독자",
        itemPrice: 7,
        itemDescription: "잔여 횟수가 10 증가한다",
      });
      await Item.create({
        itemName: "자본의 맛",
        itemPrice: 1,
        itemDescription: "게임결과에 5%만큼 점수가 가산된다",
      });
      await Item.create({
        itemName: "자본주의",
        itemPrice: 5,
        itemDescription: "게임결과에 10%만큼 점수가 가산된다",
      });
      await Item.create({
        itemName: "자낳괴",
        itemPrice: 15,
        itemDescription: "게임결과에 15%만큼 점수가 가산된다",
      });
    }
    if ((await UserItem.findAll()).length == 0) {
      await UserItem.create({
        user_address: "0xfa55215946f348d884b8c017448416a55c840404",
        item_itemName: "자본주의",
      });
      await UserItem.create({
        user_address: "0xfa55215946f348d884b8c017448416a55c840404",
        item_itemName: "자본주의",
      });
      await UserItem.create({
        user_address: "0xfa55215946f348d884b8c017448416a55c840404",
        item_itemName: "중독자",
      });
    }
    if ((await Ranking.findAll()).length == 0) {
      await Ranking.create({
        weeks: 1,
        game_title: "블록쌓기",
        gameScore: 5,
        ranking: 2,
        user_address: "0xfa55215946f348d884b8c017448416a55c840404",
      });
      await Ranking.create({
        weeks: 1,
        game_title: "블록쌓기",
        gameScore: 8,
        ranking: 1,
        user_address: "0x861efdf405b70b30388bdf2ad1ff3940e2d0b838",
      });
    }
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
