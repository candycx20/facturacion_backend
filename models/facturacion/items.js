'use strict';
var Sequelize = require("sequelize");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class item extends Model {};
  item.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descuento: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    otros_descuento: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    impuesto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_factura: {
      type: DataTypes.INTEGER,
      references: {
        model: 'facturas',
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
    modelName: 'items',
  });
  return item;
};
