import { BelongsTo, Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Job, Project, User } from '@shared/models';
@Table({ tableName: 'loggedDays' })
export class LoggedDay extends Model<LoggedDay> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.DECIMAL })
  hours: number;

  @Column({ type: DataType.DECIMAL })
  minutes: number;

  @Column({ type: DataType.TEXT })
  description: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  public userId: string;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID, allowNull: true })
  public projectId: string;

  @BelongsTo(() => Job)
  job: Job;

  @ForeignKey(() => Job)
  @Column({ type: DataType.UUID, allowNull: true })
  public jobId: string;
}
