/**
 * JWT config.
 */
const config = {
    algorithms: ["HS256"],
    secret: "shhhh", // TODO Put in process.env
};

const {
    sequelize,
    User,
    InGameUser,
    Game,
    Item,
    UserItem,
    Ranking,
    DailyMission,
    MissionInUser,
    ClosingMission,
} = require("./models");
const schedule = require("node-schedule");

// DB 초기 세팅 (테스트 계정, 블록게임, 아이템 생성)

/* truffle develop 테스트계정 */
const testAddressArray = [
    "0xbe005997cc214577c575cab11d0430777145a7dd",
    "0x3bfa24aa222b623f91dde9b02cb97452c84daa98",
    "0xf3a183692d886b2e3f4578e8f27a2ba79051bdaa",
    "0xdc9412c646837792c4d75edf99eade051452d8c6",
    "0xdab40e9c5c55ae3dc74aa7946cb823b72531b457",
    "0x0e7e39a44b2001657fa5166c54a824e28d379081",
    "0x11ea69fce4e4a9eeea3c910cf2ee5754af922053",
    "0x5ccb892acae8b4781bc00c61208d981a923b995f",
    "0xc7c4d7c84a6ac3a6a84e1967ac2f659d0688376e",
    "0xf49c05cca88331959e4e8e7d4b4d5f8b1007d1fe",
];

/* 게임 목록 */
const gameList = [
    {
        gameTitle: "블록쌓기",
        gameUrl: "stacking-blocks",
        description:
            "정확한 타이밍에 버튼을 눌러 블록을 최대한 높게 쌓아올리는 게임",
    },
    {
        gameTitle: "테트리스",
        gameUrl: "tetris",
        description:
            "이리저리 방향을 돌려가며 빈칸이 생기지 않게 블록을 끼워 맞추는 게임",
    },
    {
        gameTitle: "보물찾기",
        gameUrl: "treasure",
        description:
            "어디에 들었는지 알 수 없는 보물상자들을 최대한 적게 열어 보물을 찾는 게임",
    },
];

/* 아이템 목록 */
const itemList = [
    {
        itemName: "기회 1",
        itemPrice: 1,
        itemDescription: "잔여 횟수가 1 증가합니다",
    },
    {
        itemName: "기회 5",
        itemPrice: 2,
        itemDescription: "잔여 횟수가 5 증가합니다",
    },
    {
        itemName: "기회 10",
        itemPrice: 3,
        itemDescription: "잔여 횟수가 10 증가합니다",
    },
    {
        itemName: "점수 +5%",
        itemPrice: 0.1,
        itemDescription: "게임결과에 5%만큼 점수가 가산됩니다",
    },
    {
        itemName: "점수 +10%",
        itemPrice: 0.2,
        itemDescription: "게임결과에 10%만큼 점수가 가산됩니다",
    },
    {
        itemName: "점수 +15%",
        itemPrice: 0.3,
        itemDescription: "게임결과에 15%만큼 점수가 가산됩니다",
    },
    {
        itemName: "조작 반전",
        itemPrice: 10,
        itemDescription:
            "테트리스 좌우, 상하 조작이 반전되고 이후 획득하는 점수에 10% 추가점수를 획득합니다",
    },
];

/* 일일 미션 목록 */
const dailyMission = [
    {
        game_title: "블록쌓기",
        targetValue: 10,
        missionDetails: "블록 10개 이상 쌓기",
    },
    {
        game_title: "테트리스",
        targetValue: 10,
        missionDetails: "블록 10줄 이상 제거",
    },
    {
        game_title: "보물찾기",
        targetValue: 10,
        missionDetails: "열쇠 10개 이상 남긴 채 보물 발견",
    },
];

/* 일일 미션 등록 */
const missionReg = async (account, tokenId) => {
    console.log("server: 토큰id " + tokenId);
    if (tokenId >= 1 && tokenId <= 60) {
        console.log("red");
        const randomRed = Math.floor(Math.random() * 3 + 1);
        console.log(randomRed);
        await MissionInUser.create({
            user_address: account,
            mission_id: randomRed,
        });
    } else if (tokenId >= 61 && tokenId <= 90) {
        console.log("green");
        const randomGreen = [];
        let i = 0;
        function same(n) {
            for (let j = 0; j < randomGreen.length; j++) {
                if (n == randomGreen[j]) {
                    return true;
                }
            }
            return false;
        }
        while (i < 2) {
            let temp = Math.floor(Math.random() * 3 + 1);
            if (!same(temp)) {
                randomGreen.push(temp);
                i++;
            }
        }
        for (let i = 0; i < 2; i++) {
            await MissionInUser.create({
                user_address: account,
                mission_id: randomGreen[i],
            });
        }
    } else if (tokenId >= 91 && tokenId <= 100) {
        console.log("purple");
        for (let i = 0; i < dailyMission.length; i++) {
            await MissionInUser.create({
                user_address: account,
                mission_id: i + 1,
            });
        }
    }
};

/* 대표 NFT별 참여횟수 초기값 받기 */
const initChance = async (account, gameTitle, tokenId) => {
    console.log("server: 토큰id " + tokenId);
    console.log("server: 겜 " + gameTitle);
    if (tokenId >= 1 && tokenId <= 60) {
        console.log("red");
        await InGameUser.update(
            { gameCount: 5 },
            { where: { user_address: account, game_title: gameTitle } }
        );
    } else if (tokenId >= 61 && tokenId <= 90) {
        console.log("green");
        await InGameUser.update(
            { gameCount: 10 },
            { where: { user_address: account, game_title: gameTitle } }
        );
    } else if (tokenId >= 91 && tokenId <= 100) {
        console.log("purple");
        await InGameUser.update(
            { gameCount: 15 },
            { where: { user_address: account, game_title: gameTitle } }
        );
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
        // 일일미션 추가
        for (let i = 0; i < dailyMission.length; i++) {
            await DailyMission.create({
                game_title: dailyMission[i].game_title,
                targetValue: dailyMission[i].targetValue,
                missionDetails: dailyMission[i].missionDetails,
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
                item_itemName:
                    itemList[Math.floor(Math.random() * itemList.length)]
                        .itemName,
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
                        isApproved: true,
                        isRewarded: true,
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
    const latestWeekData = await Ranking.findOne({
        attributes: ["weeks"],
        order: [["weeks", "desc"]],
    });
    const latestWeek = latestWeekData.weeks; // 최신 주(week)
    // 게임별 TOP 3 찾기
    for (let i = 0; i < gameList.length; i++) {
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
    // 집계 끝났으면 게임 플레이 현황 테이블 비워주기
    await InGameUser.sync({ force: true });
    console.log(`순위 집계가 끝났습니다`);
    unlockNFT(); // 모든 사용자 대표 NFT 해제하기

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

/* 일일미션 집계 */
const missionAggregation = async () => {
    // 현재 모든 사용자의 일일미션 중 미션달성(attainment: true) 한 것만 찾기
    const attainmentArr = await MissionInUser.findAll({
        where: { attainment: true },
        raw: true,
    });
    // 달성한 미션 수 만큼 반복
    for (let i = 0; i < attainmentArr.length; i++) {
        // 달성자와 달성시간을 ClosingMission 테이블에 기록
        await ClosingMission.create({
            user_address: attainmentArr[i].user_address,
            attainmentTime: attainmentArr[i].updatedAt,
        });
    } // 달성미션 다 기록했으면 현재 모든 사용자의 일일미션 없애주기
    await MissionInUser.sync({ force: true });
    console.log(`미션 달성 집계 완료`);
};

/* 대표 NFT 해제하기 */
const unlockNFT = async () => {
    console.log("대표 NFT 해제");
    await User.update({ mainNft: null }, { where: {} });
};

/* 매주 순위 집계 시행하기 */
const weeklySchedule = async () => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = AggregationDate.week.dayOfWeek; // 수요일 (0~6 / 일~토)
    rule.hour = AggregationDate.week.hour;
    rule.minute = AggregationDate.week.minute;
    const job = schedule.scheduleJob(rule, function () {
        rankAggregation(); // 순위집계 시행
    });
};

/* 하루 한번 일일미션 등록시켜주기 */
const dailylySchedule = async () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = AggregationDate.hour;
    rule.minute = AggregationDate.day.minute;
    const job = schedule.scheduleJob(rule, function () {
        missionAggregation(); // 일일미션 집계
    });
};

const AggregationDate = {
    week: { dayOfWeek: 6, hour: 9, minute: 0 },
    day: { hour: 9, minute: 0 },
};

module.exports = {
    AggregationDate,
    config,
    itemList,
    getDatabaseConfig,
    initChance,
    rankAggregation,
    missionAggregation,
    gameList,
    weeklySchedule,
    dailylySchedule,
    itemList,
    dailyMission,
    missionReg,
    unlockNFT,
};
