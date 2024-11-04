'use strict';
var Sequelize = require("sequelize");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class factura extends Model {};
  factura.init({
    no_autorizacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_acceso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_hora_emision: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_hora_certificacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    impuesto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_emisor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'emisores',
        key: 'id'
      }
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
    modelName: 'facturas',
  });
  return factura;
};
