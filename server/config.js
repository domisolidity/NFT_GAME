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
    gameTitle: "블록쌓기",
    gameUrl: "stacking-blocks",
    description: "스르륵 움직이는 블록을 단단히 고정된 블록에 정확한 순간에 착 놓아서 쑥쑥 높게 쌓아올리는 게임",
  },
  {
    gameTitle: "테트리스",
    gameUrl: "tetris",
    description: "긴 거 필요할 때 꼭 안 나오는 그 게임",
  },
  {
    gameTitle: "보물찾기",
    gameUrl: "treasure",
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
  {
    itemName: "혼돈의 카오스",
    itemPrice: 10,
    itemDescription: "테트리스 좌우, 상하 조작이 반전되고 이후 획득하는 점수에 10% 추가점수를 획득합니다",
  },
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
    // 테스트 계정 1,2,3 가입시키기
    for (let i = 0; i < 3; i++) {
      await User.create({
        publicAddress: testAddressArray[i],
      });
    }
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
        gameUrl: gameList[i].gameUrl,
        description: gameList[i].description,
      });
    }
    // 테스트 계정들 게임별 임의 플레이 기록 추가
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < gameList.length; j++) {
        await InGameUser.create({
          user_address: testAddressArray[i],
          game_title: gameList[j].gameTitle,
          gameScore: Math.floor(Math.random() * 30),
        });
      }
    }
    // 테스트 0번 계정에 아이템 임의로 추가
    for (let i = 0; i < 50; i++) {
      await UserItem.create({
        user_address: testAddressArray[0],
        item_itemName: itemList[Math.floor(Math.random() * itemList.length)].itemName,
      });
    }

    // 3주차까지 테스트계정 1,2,3의 임의기록 저장
    const testWeek = 3;
    let tempWeek = 1;
    for (let i = 0; i < testWeek; i++) {
      for (let j = 0; j < gameList.length; j++) {
        let testScore = 30;
        let tempRank = 1;
        for (let k = 0; k < 3; k++) {
          await Ranking.create({
            weeks: tempWeek,
            game_title: gameList[j].gameTitle,
            gameScore: testScore - Math.floor(Math.random() * 10),
            ranking: tempRank,
            user_address: testAddressArray[k],
          });
          testScore = testScore - 10;
          tempRank++;
        }
      }
      tempWeek++;
    }
  }
};

/* 순위 집계 */
/* InGameUser 테이블에서 게임별로 TOP 3를 찾아 순위 테이블에 기록하고 
   InGameUser 테이블 초기화하기                                     */
const rankAggregation = async () => {
  // 게임별 TOP 3 찾기
  for (let i = 0; i < gameList.length; i++) {
    const latestWeekData = await Ranking.findOne({ attributes: ["weeks"], limit: 1, order: [["weeks", "desc"]] });
    const latestWeek = latestWeekData.weeks; // 최신 주(week)
    const gameTitle = gameList[i].gameTitle; // 게임명
    // 이번 주 차 TOP 3 정보
    const thisWeekRankData = await InGameUser.findAll({
      raw: true,
      limit: 3, // 결과로 3개만 가져올 것.
      order: [
        ["gameScore", "desc"], // 게임점수 내림차순
        ["updatedAt", "asc"], // 갱신시간 오름차순
      ],
      where: { game_title: gameTitle },
    });

    // 찾은 TOP 3를 순위테이블에 넣어주기
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

  // 테스트 계정들 게임별 임의 플레이 기록 추가
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < gameList.length; j++) {
      await InGameUser.create({
        user_address: testAddressArray[i],
        game_title: gameList[j].gameTitle,
        gameScore: Math.floor(Math.random() * 30),
      });
    }
  }
};

/* 매주 순위 집계 시행하기 */
const weeklySchedule = async () => {
  const rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = 3; // 수요일 (0~6 / 일~토)
  rule.hour = 22;
  rule.minute = 44;
  rule.second = 00;

  const job = schedule.scheduleJob(rule, function () {
    rankAggregation(); // 순위집계 시행
  });
};

module.exports = { config, itemList, getDatabaseConfig, rankAggregation, gameList, weeklySchedule, itemList };
