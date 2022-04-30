const Sequelize = require("sequelize");

/* 아이템 정보 DB */
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemId: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
          unique: true, // unique: true - 고유하게
        },
        itemName: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true, // unique: true - 고유하게
        },
        itemPrice: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        itemDescription: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Item",
        tableName: "items",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Item.hasMany(db.UserItem, {
      foreignKey: "item_itemName",
      sourceKey: "itemName",
    });
  }
};
