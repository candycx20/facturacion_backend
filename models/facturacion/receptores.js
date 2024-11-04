'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receptor extends Model {
    static associate(models) {
      receptor.hasOne(models.establecimientos, {
        foreignKey: 'id_receptor',
        as: 'establecimiento'
      });
    }
  }
  receptor.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'receptores',
  });
  return receptor;
};