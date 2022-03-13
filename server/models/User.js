const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        publicAddress: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true, // unique: true - 고유하게
          validate: { isLowercase: true },
        },
        userName: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nonce: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: () => Math.floor(Math.random() * 10 ** 5)
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

  static associate(db) { }
};
