import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { UserProviderEnum } from '@common/enums/users';
import { User } from '@shared/models';

@Table({ tableName: 'providers', createdAt: false, updatedAt: false })
export class UserProvider extends Model<UserProvider> {
  @Column({ type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: number;

  @Column({
    type: DataType.ENUM(UserProviderEnum.MICROSOFT, UserProviderEnum.NATIVE),
    defaultValue: UserProviderEnum.MICROSOFT,
  })
  type: UserProviderEnum;

  @Column({ type: DataType.UUID })
  oid: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  userId?: string;
}
