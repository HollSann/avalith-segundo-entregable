"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("cars", [
      {
        brand: "Toyota",
        speed: "200",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: "Ford",
        speed: "300",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("cars", null, {});
  },
};
