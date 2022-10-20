import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

import { Client, User, Project } from '@shared/models';
@Table({ tableName: 'departments', createdAt: false, updatedAt: false })
export class Department extends Model<Department> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasOne(() => User)
  user: User;

  @HasOne(() => Project)
  project: Project;

  @HasOne(() => Client)
  client: Client;
}
