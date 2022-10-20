'use strict';

const { UserRoleEnum, UserStatusEnum, UserProviderEnum } = require('../src/common/enums/users');
const { ProjectTypeEnum, ProjectStatusEnum } = require('../src/common/enums/projects');
const { v4: uuidv4 } = require('uuid');

const adminId = uuidv4();
const userId = uuidv4();
const user = uuidv4();
const profile = uuidv4();
const provider = uuidv4();

const access = [
  {
    id: uuidv4(),
    module: 'user',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'access',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'loggedDay',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'project',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'client',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'department',
    method: 'manage',
    permission: true,
    roleId: adminId,
  },
  {
    id: uuidv4(),
    module: 'user',
    method: 'read',
    permission: true,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'user',
    method: 'update',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'user',
    method: 'delete',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'user',
    method: 'create',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'loggedDay',
    method: 'manage',
    permission: true,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'client',
    method: 'manage',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'department',
    method: 'read',
    permission: true,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'department',
    method: 'create',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'department',
    method: 'update',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'department',
    method: 'delete',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'project',
    method: 'read',
    permission: true,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'project',
    method: 'create',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'project',
    method: 'update',
    permission: false,
    roleId: userId,
  },
  {
    id: uuidv4(),
    module: 'project',
    method: 'delete',
    permission: false,
    roleId: userId,
  },
];
const roles = [
  {
    id: userId,
    type: 'user',
  },
  {
    id: adminId,
    type: 'admin',
  },
];
const users = [
  {
    id: user,
    email: 'Oleksandr.Dudnyk@fivesysdev.com',
    password: null,
    refreshToken: null,
    salary: null,
    status: 'idle',
    roleId: adminId,
    departmentId: null,
  },
];
const providers = [
  {
    id: provider,
    oid: 'd334ca3d-4e60-45c2-a066-8e65f3946063',
    userId: user,
  },
];
const profiles = [
  {
    id: profile,
    firstName: 'Oleksandr',
    lastName: 'Dudnyk',
    lastSessionDateTime: null,
    phone: null,
    userId: user,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notificationTypes', {
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
    }),
      await queryInterface.createTable('roles', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        type: {
          type: Sequelize.STRING,
          defaultValue: UserRoleEnum.USER,
          allowNull: false,
        },
      }),
      await queryInterface.createTable('departments', {
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
      }),
      await queryInterface.createTable('files', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        fileName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        originalFileName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        mimeType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('clients', {
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
        website: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        departmentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id',
          },
        },
        avatarId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'files',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('roleNotificationTypes', {
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
        template: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        notificationTypeId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'notificationTypes',
            key: 'id',
          },
        },
        roleId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
      }),
      await queryInterface.createTable('projects', {
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
        type: {
          type: Sequelize.STRING,
          defaultValue: ProjectTypeEnum.BACKEND,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: ProjectStatusEnum.PAUSED,
        },
        imageId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'files',
            key: 'id',
          },
        },
        departmentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id',
          },
        },
        clientId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'clients',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('access', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        module: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        method: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        permission: {
          type: Sequelize.BOOLEAN,
        },
        roleId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
      }),
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        refreshToken: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        salary: {
          type: Sequelize.DECIMAL,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: UserStatusEnum.IDLE,
        },
        roleId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'roles',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        departmentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('projectUsers', {
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        projectId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      }),
      await queryInterface.createTable('providers', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        type: {
          type: Sequelize.STRING,
          defaultValue: UserProviderEnum.MICROSOFT,
        },
        oid: {
          type: Sequelize.UUID,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      }),
      await queryInterface.createTable('rates', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        rate: {
          type: Sequelize.DECIMAL,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        projectId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('loggedDays', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        date: {
          type: Sequelize.DATE,
        },
        hours: {
          type: Sequelize.DECIMAL,
        },
        minutes: {
          type: Sequelize.DECIMAL,
        },
        description: {
          type: Sequelize.TEXT,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        projectId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'projects',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('profiles', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastSessionDateTime: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        avatarId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'files',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      }),
      await queryInterface.createTable('notifications', {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        isDelivered: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        roleNotificationTypeId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'roleNotificationTypes',
            key: 'id',
          },
        },
        projectId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      });
    await queryInterface.bulkInsert('roles', roles, {});
    await queryInterface.bulkInsert('access', access, {});
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('providers', providers, {});
    await queryInterface.bulkInsert('profiles', profiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  },
};
