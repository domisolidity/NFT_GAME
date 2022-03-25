const Sequelize = require("sequelize");

/* 사용자 정보 DB */
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true, // unique: true - 고유하게
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nationality: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        favorite: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
