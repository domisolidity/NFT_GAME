const express = require("express");
const router = express.Router();
const { User, Game, InGameUser, Item, UserItem } = require("../../../models");
const bcrypt = require("bcrypt");

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

module.exports = router;
