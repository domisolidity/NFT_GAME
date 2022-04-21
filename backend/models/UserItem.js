const Sequelize = require("sequelize");

/* 소유 아이템과 사용자 정보 DB */
module.exports = class UserItem extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userItemId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true, // unique: true - 고유하게
        },
        user_address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        item_itemName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserItem",
        tableName: "user_items",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserItem.belongsTo(db.User, {
      foreignKey: "user_address",
      targetKey: "publicAddress",
    });
    db.UserItem.belongsTo(db.Item, {
      foreignKey: "item_itemName",
      targetKey: "itemName",
    });
  }
};
