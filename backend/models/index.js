"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./User");
const Game = require("./Game");
const InGameUser = require("./InGameUser");
const Item = require("./Item");
const UserItem = require("./UserItem");
const Ranking = require("./Ranking");

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User;
db.Game = Game;
db.InGameUser = InGameUser;
db.Item = Item;
db.UserItem = UserItem;
db.Ranking = Ranking;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
