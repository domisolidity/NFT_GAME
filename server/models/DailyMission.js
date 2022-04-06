const Sequelize = require("sequelize");

/* 일일미션 정보 DB */
module.exports = class DailyMission extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        missionId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true,
        },
        game_title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        targetValue: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        missionDetails: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "DailyMission",
        tableName: "daily_missions",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.DailyMission.belongsTo(db.Game, {
      foreignKey: "game_title",
      targetKey: "gameTitle",
    });
    db.DailyMission.hasMany(db.MissionInUser, {
      foreignKey: "mission_id",
      sourceKey: "missionId",
    });
  }
};
