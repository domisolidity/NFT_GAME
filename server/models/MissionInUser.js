const Sequelize = require("sequelize");

/* 사용자별 미션 현황 DB */
module.exports = class MissionInUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_address: {
          type: Sequelize.STRING,
        },
        mission_id: {
          type: Sequelize.INTEGER,
        },
        attainment: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "MissionInUser",
        tableName: "mission_in_users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.MissionInUser.belongsTo(db.User, {
      foreignKey: "user_address",
      targetKey: "publicAddress",
    });
    db.MissionInUser.belongsTo(db.DailyMission, {
      foreignKey: "mission_id",
      targetKey: "missionId",
    });
  }
};
