import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { NotificationType, Notification, Role } from '@shared/models';

@Table({ tableName: 'roleNotificationTypes', createdAt: false, updatedAt: false })
export class RoleNotificationType extends Model<RoleNotificationType> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  template: string;

  @BelongsTo(() => NotificationType)
  notificationType: NotificationType;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Notification)
  notifications: Notification[];

  @ForeignKey(() => NotificationType)
  @Column({ type: DataType.UUID, allowNull: false })
  public notificationTypeId: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: false })
  public roleId: string;
}
