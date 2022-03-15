const Sequelize = require("sequelize");

/* 게임 정보 DB */
module.exports = class Score extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        gameId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        title: {
          type: Sequelize.STRING,
          unique: true, // 고유하게,
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
      sourceKey: "title",
    });
    // db.User.hasMany(db.user, {
    //   foreignKey: "team_leaderId",
    //   sourceKey: "user_id",
    // });
  }
};
