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
    const testAddressArray = [
      "0xfa55215946f348d884b8c017448416a55c840404",
      "0x861efdf405b70b30388bdf2ad1ff3940e2d0b838",
      "0x37c23949a518280fc713a98ad2bd932115e8c241",
      "0x323db1bf7dc3d94a524e5b45a74895ac07e42117",
      "0xe33d49d7bce9370b5f83891ef36a3a18c2d1382f",
      "0x6781b9abe797e05c76f4d2ae31826a230ca6b85a",
      "0x4849400b5a5ccba2fa4724cdfb00a0992251c892",
      "0xfe562b5cf8f4575e2f7aa661a754b793eb25a462",
      "0x6c72a8b6f288a9880ed5ecec8c95f0608edcdd73",
      "0xa5cb4186dd3102e87fc9e5af9e3b04217f0768ab",
    ];
    const games = [
      {
        title: "블록쌓기",
        description: "스르륵 움직이는 블록을 단단히 고정된 블록에 정확한 순간에 착 놓아서 쑥쑥 높게 쌓아올리는 게임",
      },
    ];
    const items = [
      { itemName: "아쉬워", itemPrice: 1, itemDescription: "잔여 횟수가 1 증가한다" },
      { itemName: "겜돌이", itemPrice: 4, itemDescription: "잔여 횟수가 5 증가한다" },
      { itemName: "중독자", itemPrice: 7, itemDescription: "잔여 횟수가 10 증가한다" },
      { itemName: "자본의 맛", itemPrice: 1, itemDescription: "게임결과에 5%만큼 점수가 가산된다" },
      { itemName: "자본주의", itemPrice: 5, itemDescription: "게임결과에 10%만큼 점수가 가산된다" },
      { itemName: "자낳괴", itemPrice: 15, itemDescription: "게임결과에 15%만큼 점수가 가산된다" },
    ];
    if (
      (await User.findAll()).length == 0 &&
      (await InGameUser.findAll()).length == 0 &&
      (await Item.findAll()).length == 0 &&
      (await Game.findAll()).length == 0 &&
      (await UserItem.findAll()).length == 0 &&
      (await Ranking.findAll()).length == 0
    ) {
      for (let i = 0; i < items.length; i++) {
        await Item.create({
          itemName: items[i].itemName,
          itemPrice: items[i].itemPrice,
          itemDescription: items[i].itemDescription,
        });
      }

      await Game.create({
        title: games[0].title,
        description: games[0].description,
      });

      for (let i = 0; i < testAddressArray.length; i++) {
        await User.create({
          publicAddress: testAddressArray[i],
        });

        await InGameUser.create({
          user_address: testAddressArray[i],
          game_title: games[0].title,
          gameScore: Math.floor(Math.random() * 10),
        });
      }

      for (let i = 0; i < Math.floor(Math.random() * 5) + 6; i++) {
        await UserItem.create({
          user_address: testAddressArray[0],
          item_itemName: items[Math.floor(Math.random() * 6)].itemName,
        });
      }

      for (let i = 0; i < 5; i++) {
        await Ranking.create({
          weeks: 1,
          game_title: games[0].title,
          gameScore: 10 - i,
          ranking: i + 1,
          user_address: testAddressArray[i],
        });
      }
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
