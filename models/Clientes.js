
'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    static associate(models) {
      /* usuario.belongsTo(models.tipo_usuarios, {
        foreignKey: "id_tipo_usuario",
      }); */
    }
  };
  nombre.init({
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    
    },nit: {
        type: DataTypes.STRING,
        allowNull: false
    }
      

    
    
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};