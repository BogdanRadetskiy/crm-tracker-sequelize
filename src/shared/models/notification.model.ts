import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';

import { RoleNotificationType, Project, User } from '@shared/models';
@Table({ tableName: 'notifications' })
export class Notification extends Model<Notification> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  message: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isDelivered: boolean;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => RoleNotificationType)
  roleNotificationType: RoleNotificationType;

  @ForeignKey(() => RoleNotificationType)
  @Column({ type: DataType.UUID, allowNull: false })
  public roleNotificationTypeId: string;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID, allowNull: false })
  public projectId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  public userId: string;
}
