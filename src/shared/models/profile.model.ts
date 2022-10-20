import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';

import { User, File } from '@shared/models';

@Table({ tableName: 'profiles', createdAt: false, updatedAt: false })
export class Profile extends Model<Profile> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.DATE, allowNull: true })
  lastSessionDateTime: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => File)
  file: File;

  @ForeignKey(() => File)
  @Column({ type: DataType.UUID, allowNull: true })
  avatarId?: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true, defaultValue: null })
  skills?: string[];
}
