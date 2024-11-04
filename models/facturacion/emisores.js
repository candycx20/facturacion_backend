'use strict';
var Sequelize = require("sequelize");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class emisor extends Model {};
  emisor.init({
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'emisores',
  });
  return emisor;
};
