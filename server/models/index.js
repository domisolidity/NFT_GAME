"use strict";

// const fs = require('fs');
const path = require("path");
const Sequelize = require("sequelize");
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./User");
const Game = require("./Game");
const InGameUser = require("./InGameUser");
const Item = require("./Item");
const UserItem = require("./UserItem");

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
