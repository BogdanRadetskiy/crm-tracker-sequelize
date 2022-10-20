'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'clientId'),
      await queryInterface.addColumn('projects', 'clientId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'clientId'),
      await queryInterface.addColumn('projects', 'clientId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
  },
};
