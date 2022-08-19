
'use strict';
var Sequelize = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    static associate(models) {
      /* usuario.belongsTo(models.tipo_usuarios, {
        foreignKey: "id_tipo_usuario",
      }); */
    }
  };
  nombre.init({
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_compra: {
      type: DataTypes.INTEGER,
      allowNull: false
    
    },Precio_venta: {
        type: DataTypes.STRING,
        allowNull: false
    }
      

    
    
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Producto;
};