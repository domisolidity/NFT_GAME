"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          address: "aa",
          password: "aa",
          nationality: "kr",
          favorite: "pop",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "bb",
          password: "bb",
          nationality: "kr",
          favorite: "dance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          address: "cc",
          password: "cc",
          nationality: "usa",
          favorite: "dance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
