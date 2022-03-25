const Sequelize = require("sequelize");

/* 회차, 게임별 순위 정보 DB */
module.exports = class Ranking extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        rankingId: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        weeks: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        game_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gameScore: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        ranking: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_address: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { isLowercase: true }, // 소문자만 허용
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Ranking",
        tableName: "rankings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Ranking.belongsTo(db.User, {
      foreignKey: "user_address",
      targetKey: "publicAddress",
    });
    db.Ranking.belongsTo(db.Game, {
      foreignKey: "game_title",
      targetKey: "gameTitle",
    });
  }
};
