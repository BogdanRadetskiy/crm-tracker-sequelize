import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { LoggedDay } from '@shared/models/logged-day.model';

@Table({ tableName: 'jobs' })
export class Job extends Model<Job> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => LoggedDay)
  loggedDays: LoggedDay[];
}
