import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { ModulesEnum } from '@common/enums/models';
import { MethodsEnum } from '@common/enums/methods';
import { Role } from '@shared/models';

@Table({ tableName: 'access', createdAt: false, updatedAt: false })
export class Access extends Model<Access> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    type: DataType.ENUM(
      ModulesEnum.Client,
      ModulesEnum.Auth,
      ModulesEnum.User,
      ModulesEnum.Project,
      ModulesEnum.LoggedDay,
      ModulesEnum.Department,
    ),
  })
  module: ModulesEnum;

  @Column({
    type: DataType.ENUM(
      MethodsEnum.Create,
      MethodsEnum.Delete,
      MethodsEnum.Manage,
      MethodsEnum.Read,
      MethodsEnum.Update,
    ),
  })
  method: MethodsEnum;

  @Column({ type: DataType.BOOLEAN })
  permission: boolean;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: false })
  roleId: string;
}
