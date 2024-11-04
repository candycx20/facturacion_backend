'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaReservacion: {
        type: Sequelize.DATE,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('citas');
  }
};