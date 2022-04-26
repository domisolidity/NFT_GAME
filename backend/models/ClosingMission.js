const Sequelize = require("sequelize");

/* 일일미션 성공 보상 */
module.exports = class ClosingMission extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        attainmentTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        isApproved: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isRewarded: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "ClosingMission",
        tableName: "closing_missions",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.ClosingMission.belongsTo(db.User, {
      foreignKey: "user_address",
      targetKey: "publicAddress",
    });
  }
};
