import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { RoleNotificationType } from '@shared/models';

@Table({ tableName: 'notificationTypes', createdAt: false, updatedAt: false })
export class NotificationType extends Model<NotificationType> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => RoleNotificationType)
  roleNotificationTypes: RoleNotificationType[];
}
