import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Project, User } from '@shared/models';

@Table({ tableName: 'projectUsers', createdAt: false, updatedAt: false })
export class ProjectUser extends Model<ProjectUser> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Project)
  @Column
  projectId: number;
}
