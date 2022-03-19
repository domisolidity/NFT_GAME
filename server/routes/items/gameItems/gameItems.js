const express = require("express");
const router = express.Router();
const { User, Game, InGameUser, Item, UserItem } = require("../../../models");
const bcrypt = require("bcrypt");
const databaseConfig = require("../../../config");
const itemList = databaseConfig.itemList;

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

// 아이템 목록 가져오기
router.get("/", async (req, res) => {
  const response = await Item.findAll().catch((err) => console.log(err));
  res.send(response);
});

// 내 소유 아이템 수량 가져오기
router.post("/my-items-quantity", async (req, res) => {
  const account = req.body.account;
  const itemName = req.body.itemName;
  const response = await UserItem.findAndCountAll({
    where: {
      user_address: account,
      item_itemName: itemName,
    },
  }).catch((err) => console.log(err));

  res.send(response);
});

// 아이템 구매하기
router.post("/buy-item", async (req, res) => {
  const account = req.body.account;
  const itemName = req.body.itemName;
  await UserItem.create({
    user_address: account,
    item_itemName: itemName,
  })
    .then(res.send("구매완료"))
    .catch((err) => console.log(err));
});

// 아이템 사용하기
router.post("/using-item", async (req, res) => {
  const account = req.body.account;
  const itemName = req.body.itemName;
  const gameTitle = req.body.gameTitle;
  const myItemData = await UserItem.findOne({
    order: [["updatedAt", "asc"]], // 구입시기가 오래된거
    where: { user_address: account, item_itemName: itemName },
  });
  if (!myItemData) return;

  const itemEffect = await usingItem(account, itemName, gameTitle);
  console.log(itemEffect);

  await UserItem.destroy({
    where: {
      user_address: account,
      item_itemName: itemName,
      userItemId: myItemData.userItemId,
    },
  }).catch((err) => console.log(err));
  res.send(itemEffect);
});

module.exports = router;
