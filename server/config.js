/**
 * JWT config.
 */
const config = {
  algorithms: ["HS256"],
  secret: "shhhh", // TODO Put in process.env
};

const { sequelize, User, InGameUser, Game, Item, UserItem, Ranking } = require("./models");
const schedule = require("node-schedule");

// DB 초기 세팅 (테스트 계정, 블록게임, 아이템 생성)

/* truffle develop 테스트계정 */
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

/* 게임 목록 */
const gameList = [
  {
    title: "블록쌓기",
    description: "스르륵 움직이는 블록을 단단히 고정된 블록에 정확한 순간에 착 놓아서 쑥쑥 높게 쌓아올리는 게임",
  },
];

/* 아이템 목록 */
const itemList = [
  { itemName: "아쉬워", itemPrice: 1, itemDescription: "잔여 횟수가 1 증가합니다" },
  { itemName: "겜돌이", itemPrice: 4, itemDescription: "잔여 횟수가 5 증가합니다" },
  { itemName: "중독자", itemPrice: 7, itemDescription: "잔여 횟수가 10 증가합니다" },
  { itemName: "자본의 맛", itemPrice: 1, itemDescription: "게임결과에 5%만큼 점수가 가산됩니다" },
  { itemName: "자본주의", itemPrice: 5, itemDescription: "게임결과에 10%만큼 점수가 가산됩니다" },
  { itemName: "자낳괴", itemPrice: 15, itemDescription: "게임결과에 15%만큼 점수가 가산됩니다" },
];

/* 아이템 사용에 따른 효과 */
const usingItem = async (account, itemName, gameTitle) => {
  const myPlayingGame = await InGameUser.findOne({ where: { user_address: account, game_title: gameTitle } });
  switch (itemName) {
    case itemList[0].itemName:
      await InGameUser.update(
        {
          gameCount: myPlayingGame.gameCount + 1,
        },
        {
          where: { user_address: account, game_title: gameTitle },
        }
      );
      break;
    case itemList[1].itemName:
      await InGameUser.update(
        {
          gameCount: myPlayingGame.gameCount + 5,
        },
        {
          where: { user_address: account, game_title: gameTitle },
        }
      );
      break;
    case itemList[2].itemName:
      await InGameUser.update(
        {
          gameCount: myPlayingGame.gameCount + 10,
        },
        {
          where: { user_address: account, game_title: gameTitle },
        }
      );
      break;
    case itemList[3].itemName:
      return "1.05";
    case itemList[4].itemName:
      return "1.1";
    case itemList[5].itemName:
      return "1.15";
  }
};

/* DB 초기 데이터 입력 */
const getDatabaseConfig = async () => {
  if (
    (await User.findAll()).length == 0 &&
    (await InGameUser.findAll()).length == 0 &&
    (await Item.findAll()).length == 0 &&
    (await Game.findAll()).length == 0 &&
    (await UserItem.findAll()).length == 0 &&
    (await Ranking.findAll()).length == 0
  ) {
    for (let i = 0; i < itemList.length; i++) {
      await Item.create({
        itemName: itemList[i].itemName,
        itemPrice: itemList[i].itemPrice,
        itemDescription: itemList[i].itemDescription,
      });
    }

    await Game.create({
      title: gameList[0].title,
      description: gameList[0].description,
    });

    for (let i = 0; i < testAddressArray.length; i++) {
      await User.create({
        publicAddress: testAddressArray[i],
      });

      await InGameUser.create({
        user_address: testAddressArray[i],
        game_title: gameList[0].title,
        gameScore: Math.floor(Math.random() * 10),
      });
    }

    for (let i = 0; i < Math.floor(Math.random() * 5) + 6; i++) {
      await UserItem.create({
        user_address: testAddressArray[0],
        item_itemName: itemList[Math.floor(Math.random() * 6)].itemName,
      });
    }

    for (let i = 0; i < 5; i++) {
      await Ranking.create({
        weeks: 0,
        game_title: gameList[0].title,
        gameScore: 10 - i,
        ranking: i + 1,
        user_address: testAddressArray[i],
      });
    }
  }
};

/* 순위 집계 */
const rankAggregation = async () => {
  /* InGameUser 테이블에서 TOP 5를 찾아 순위 테이블에 기록하고 
     InGameUser 테이블 초기화하기                            */
  for (let i = 0; i < gameList.length; i++) {
    const latestWeekData = await Ranking.findOne({ attributes: ["weeks"], limit: 1, order: [["weeks", "desc"]] });
    const latestWeek = latestWeekData.weeks; // 최신 주(week)
    const gameTitle = gameList[i].title; // 게임명
    // 이번 주 차 TOP 5 정보
    const thisWeekRankData = await InGameUser.findAll({
      raw: true,
      limit: 5, // 결과로 5개만 가져올 것.
      order: [
        ["gameScore", "desc"], // 게임점수 내림차순
        ["updatedAt", "asc"], // 갱신시간 오름차순
      ],
      where: { game_title: gameTitle },
    });

    // TOP 5 를 순위테이블에 넣어주기
    for (let i = 0; i < thisWeekRankData.length; i++) {
      await Ranking.create({
        weeks: latestWeek + 1,
        game_title: gameTitle,
        gameScore: thisWeekRankData[i].gameScore,
        ranking: i + 1,
        user_address: thisWeekRankData[i].user_address,
      });
    }
  }
  await InGameUser.sync({ force: true });
  console.log(`순위 집계가 끝났습니다`);
};

/* 매주 순위 집계 시행하기 */
const weeklySchedule = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 3; // 수요일 (0~6 / 일~토)
  rule.hour = 7;
  rule.tz = "Etc/UTC";

  const job = schedule.scheduleJob(rule, function () {
    rankAggregation();
  });
};

module.exports = { config, getDatabaseConfig, rankAggregation, gameList, weeklySchedule, itemList, usingItem };
