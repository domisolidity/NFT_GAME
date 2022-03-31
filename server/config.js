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
  "0xff33a5edfa345846a7041ea31423140ef5c23ec6",
  "0x74f3f774230b0169b0b9cb720cf3bc038033042f",
  "0x99b23d3c08f88adcff136a20a7f93ae117a7cf7b",
  "0x0eff5ffec29a5d4935f179e065af0b402138a949",
  "0xd9d878b9b8b5f876a0897c7c9eb9889fb5c4eb74",
  "0xa0b85d90a781194523bda8aa448e23d7a8a47757",
  "0x5c9dc46f07773c6bdb7b2125ae8466092264f18a",
  "0xd92b3aba1d3739c88c332a220532194c5c7e5a48",
  "0x5e1ef1239e1e47f267f4bf23030182dd58b7ffb8",
  "0xf23ada7af4f60264c8e9e156d0bb65b24cf08627",
];

/* 게임 목록 */
const gameList = [
  {
    gameTitle: "stackingBlocks",
    description: "스르륵 움직이는 블록을 단단히 고정된 블록에 정확한 순간에 착 놓아서 쑥쑥 높게 쌓아올리는 게임",
  },
  {
    gameTitle: "tetris",
    description: "긴 거 필요할 때 꼭 안 나오는 그 게임",
  },
  {
    gameTitle: "treasureHunt",
    description: "운으로 승부하는 운빨 존망겜",
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
    // 아이템 추가
    for (let i = 0; i < itemList.length; i++) {
      await Item.create({
        itemName: itemList[i].itemName,
        itemPrice: itemList[i].itemPrice,
        itemDescription: itemList[i].itemDescription,
      });
    }
    // 게임 추가
    for (let i = 0; i < gameList.length; i++) {
      await Game.create({
        gameTitle: gameList[i].gameTitle,
        description: gameList[i].description,
      });
    }
    // 테스트 계정 추가
    for (let i = 0; i < testAddressArray.length; i++) {
      await User.create({
        publicAddress: testAddressArray[i],
      });
      // 테스트 계정들 0번인덱스 게임(블록쌓기)에 임의로 참여 기록 입력
      await InGameUser.create({
        user_address: testAddressArray[i],
        game_title: gameList[0].gameTitle,
        gameScore: Math.floor(Math.random() * 10),
      });
    }
    // 테스트 0번 계정에 아이템 임의로 추가
    for (let i = 0; i < 30; i++) {
      await UserItem.create({
        user_address: testAddressArray[0],
        item_itemName: itemList[Math.floor(Math.random() * 6)].itemName,
      });
    }
    // 테스트 계정들 0주차 랭킹에 임의 기록
    for (let i = 0; i < 5; i++) {
      await Ranking.create({
        weeks: 0,
        game_title: gameList[0].gameTitle,
        gameScore: 10 - i,
        ranking: i + 1,
        user_address: testAddressArray[i],
      });
    }
  }
};

/* 순위 집계 */
/* InGameUser 테이블에서 게임별로 TOP 5를 찾아 순위 테이블에 기록하고 
   InGameUser 테이블 초기화하기                                     */
const rankAggregation = async () => {
  // 게임별 TOP 5 찾기
  for (let i = 0; i < gameList.length; i++) {
    const latestWeekData = await Ranking.findOne({ attributes: ["weeks"], limit: 1, order: [["weeks", "desc"]] });
    const latestWeek = latestWeekData.weeks; // 최신 주(week)
    const gameTitle = gameList[i].gameTitle; // 게임명
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

    // 찾은 TOP 5를 순위테이블에 넣어주기
    for (let i = 0; i < thisWeekRankData.length; i++)
      await Ranking.create({
        weeks: latestWeek + 1,
        game_title: gameTitle,
        gameScore: thisWeekRankData[i].gameScore,
        ranking: i + 1,
        user_address: thisWeekRankData[i].user_address,
      });
  }
  await InGameUser.sync({ force: true });
  console.log(`순위 집계가 끝났습니다`);
};

/* 매주 순위 집계 시행하기 */
const weeklySchedule = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 3; // 수요일 (0~6 / 일~토)
  rule.hour = 7; // UTC 차이로 +9시간인 16시가 됨
  rule.minute = 0;
  rule.second = 0;
  rule.tz = "Etc/UTC";

  const job = schedule.scheduleJob(rule, function () {
    rankAggregation(); // 순위집계 시행
  });
};

module.exports = { config, itemList, getDatabaseConfig, rankAggregation, gameList, weeklySchedule, itemList };
