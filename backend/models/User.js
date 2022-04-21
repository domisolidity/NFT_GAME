const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        publicAddress: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true, // unique: true - 고유하게
          validate: { isLowercase: true },
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        mainNft: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        nonce: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: () => Math.floor(Math.random() * 10 ** 5),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.InGameUser, {
      foreignKey: "user_address",
      sourceKey: "publicAddress",
    });
    db.User.hasMany(db.UserItem, {
      foreignKey: "user_address",
      sourceKey: "publicAddress",
    });
    db.User.hasMany(db.Ranking, {
      foreignKey: "user_address",
      sourceKey: "publicAddress",
    });
    db.User.hasMany(db.MissionInUser, {
      foreignKey: "user_address",
      sourceKey: "publicAddress",
    });
    db.User.hasMany(db.ClosingMission, {
      foreignKey: "user_address",
      sourceKey: "publicAddress",
    });
  }
};
