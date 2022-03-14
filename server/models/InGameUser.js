const Sequelize = require("sequelize");

/* 게임에 대한 사용자 정보 DB */
module.exports = class Score extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        inGameUserId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true, // unique: true - 고유하게
        },
        user_address: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true, // unique: true - 고유하게
          validate: { isLowercase: true },
        },
        game_title: {
          type: Sequelize.STRING,
          // allowNull: false,
          unique: true, // 고유하게,
        },
        gameScore: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          defaultValue: 0,
        },
        gameCount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          defaultValue: 100,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "InGameUser",
        tableName: "in_game_users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.InGameUser.belongsTo(db.User, {
      foreignKey: "user_address",
      targetKey: "publicAddress",
    });
    db.InGameUser.belongsTo(db.Game, {
      foreignKey: "game_title",
      targetKey: "title",
    });
    // db.User.hasMany(db.user, {
    //   foreignKey: "team_leaderId",
    //   sourceKey: "user_id",
    // });
  }
};
