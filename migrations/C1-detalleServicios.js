'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('detalleServicios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_factura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'facturas',
            key: 'id'
        }
      }, 
      id_servicio: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'servicios',
            key: 'id'
        }
      }, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detalleServicios');
  }
};