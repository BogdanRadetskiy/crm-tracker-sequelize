import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { ProjectStatusEnum, ProjectTypeEnum } from '@common/enums/projects';
import { File, Department, Client, Notification, ProjectUser, LoggedDay, Rate, User } from '@shared/models';

@Table({ tableName: 'projects' })
export class Project extends Model<Project> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.ENUM(
      ProjectTypeEnum.BACKEND,
      ProjectTypeEnum.UNDEFINED,
      ProjectTypeEnum.DESKTOP,
      ProjectTypeEnum.MOBILE,
      ProjectTypeEnum.FRONTEND,
    ),
    defaultValue: ProjectTypeEnum.BACKEND,
  })
  type: ProjectTypeEnum;

  @Column({
    type: DataType.ENUM(
      ProjectStatusEnum.PAUSED,
      ProjectStatusEnum.CANCELLED,
      ProjectStatusEnum.ENDED,
      ProjectStatusEnum.IN_PROGRESS,
    ),
    defaultValue: ProjectStatusEnum.PAUSED,
  })
  status: ProjectStatusEnum;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @ForeignKey(() => File)
  @Column({ type: DataType.UUID, unique: true, allowNull: true })
  public imageId?: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.UUID, unique: true, allowNull: true })
  public departmentId?: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, unique: true, allowNull: false })
  public clientId?: string;

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => Client)
  client: Client;

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => LoggedDay)
  loggedDays: LoggedDay[];

  @HasMany(() => Rate)
  rates: Rate[];

  @BelongsToMany(() => User, () => ProjectUser)
  users: User[];

  @BelongsTo(() => File)
  file: File;
}
