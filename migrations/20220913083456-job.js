'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
    });
    await queryInterface.addColumn('loggedDays', 'jobId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'jobs',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('loggedDays', 'jobId');
    await queryInterface.dropTable('jobs');
  },
};
