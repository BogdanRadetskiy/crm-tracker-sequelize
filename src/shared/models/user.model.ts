import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { UserStatusEnum } from '@common/enums/users';
import {
  Role,
  Department,
  Rate,
  LoggedDay,
  Notification,
  ProjectUser,
  Project,
  Profile,
  UserProvider,
} from '@shared/models';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string;

  @Column({ type: DataType.DECIMAL, allowNull: true })
  salary: number;

  @Column({
    type: DataType.ENUM(UserStatusEnum.IDLE, UserStatusEnum.WORKING, UserStatusEnum.ON_BENCH),
    defaultValue: UserStatusEnum.IDLE,
  })
  status: UserStatusEnum;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: true })
  roleId: string;

  @BelongsTo(() => Department)
  department: Department;

  @ForeignKey(() => Department)
  @Column({ type: DataType.UUID, allowNull: true })
  departmentId?: string;

  @HasOne(() => Profile)
  profile: Profile;

  @HasMany(() => Rate)
  rates: Rate[];

  @HasMany(() => LoggedDay)
  loggedDays: LoggedDay[];

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => UserProvider)
  userProviders: UserProvider[];

  @BelongsToMany(() => Project, () => ProjectUser)
  projects: Project[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
