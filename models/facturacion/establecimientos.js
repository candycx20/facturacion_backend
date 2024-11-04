'use strict';
var Sequelize = require("sequelize");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class establecimiento extends Model {
    static associate(models) {
      establecimiento.belongsTo(models.receptores, {
        foreignKey: 'id_receptor',
        as: 'receptor'
      });
    }
  }
  establecimiento.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_receptor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'receptores',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'establecimientos',
  });
  return establecimiento;
};
