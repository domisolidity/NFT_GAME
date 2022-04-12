const Sequelize = require("sequelize");

/* 게임 정보 DB */
module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        gameId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        gameTitle: {
          type: Sequelize.STRING,
          unique: true, // 고유하게,
        },
        gameUrl: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Game",
        tableName: "games",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Game.hasMany(db.InGameUser, {
      foreignKey: "game_title",
      sourceKey: "gameTitle",
    });
    db.Game.hasMany(db.Ranking, {
      foreignKey: "game_title",
      sourceKey: "gameTitle",
    });
    db.Game.hasMany(db.DailyMission, {
      foreignKey: "game_title",
      sourceKey: "gameTitle",
    });
  }
};
