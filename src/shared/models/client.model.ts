import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { Department, File, Project } from '@shared/models';
@Table({ tableName: 'clients' })
export class Client extends Model<Client> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  website: string;

  @BelongsTo(() => Department)
  department: Department;

  @ForeignKey(() => Department)
  @Column({ type: DataType.UUID, allowNull: true, defaultValue: null })
  departmentId: string;

  @HasOne(() => Project)
  project: Project;

  @ForeignKey(() => File)
  @Column({ type: DataType.UUID, allowNull: true })
  avatarId?: string;

  @BelongsTo(() => File)
  file: File;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
