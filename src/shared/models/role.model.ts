import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { UserRoleEnum } from '@common/enums/users';
import { RoleNotificationType, Access } from '@shared/models';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.ENUM(UserRoleEnum.USER, UserRoleEnum.ADMIN),
    defaultValue: UserRoleEnum.USER,
  })
  type: UserRoleEnum;

  @HasMany(() => RoleNotificationType)
  roleNotificationTypes: RoleNotificationType[];

  @HasMany(() => Access)
  accesses: Access[];
}
