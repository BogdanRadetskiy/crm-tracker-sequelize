import { cleanEnv, num, str } from 'envalid';
import {
  Access,
  Client,
  Department,
  File,
  Job,
  LoggedDay,
  Notification,
  NotificationType,
  Profile,
  Project,
  ProjectUser,
  Rate,
  Role,
  RoleNotificationType,
  User,
  UserProvider,
} from '@shared/models';

const env = cleanEnv(process.env, {
  POSTGRES_HOST: str(),
  POSTGRES_PORT: num({ default: 5432 }),
  POSTGRES_USERNAME: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DATABASE: str(),
});

export const postgresConfig = {
  dialect: 'postgres' as const,

  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
};

export const models = [
  Access,
  Client,
  Department,
  File,
  LoggedDay,
  Notification,
  NotificationType,
  Profile,
  Project,
  ProjectUser,
  Rate,
  Role,
  RoleNotificationType,
  User,
  UserProvider,
  Job,
];
