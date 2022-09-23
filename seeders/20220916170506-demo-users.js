"use strict";
const bcrypt = require("bcrypt");

const examplePasswords = "Avalith123";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "admin@example.com",
        role: "ADMIN",
        password: bcrypt.hashSync(examplePasswords, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "user@example.com",
        role: "USER",
        password: bcrypt.hashSync(examplePasswords, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
