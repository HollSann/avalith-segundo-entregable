"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cars.belongsTo(models.users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  cars.init(
    {
      brand: { type: DataTypes.STRING, allowNull: false },
      speed: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "cars",
    }
  );
  return cars;
};
