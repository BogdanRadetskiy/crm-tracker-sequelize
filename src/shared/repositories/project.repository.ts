import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op, QueryTypes } from 'sequelize';

import { Client, Department, File, Profile, Project, User } from '@shared/models';
import { LoggedDayStatistic, ProjectStatistic, StatisticCount, UserStatistic } from '@common/types/statistic';
import { mappingUpdateResponse } from '@shared/helpers';
import { ProjectData } from '@common/types/project';

export class ProjectRepository {
  constructor(
    @InjectModel(Project)
    private readonly project: typeof Project,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.project.findAll({
      include: [
        {
          model: Client,
        },
        {
          model: User,
          include: [
            {
              model: Profile,
              include: [
                {
                  model: File,
                },
              ],
            },
          ],
        },
        {
          model: File,
        },
      ],
    });
  }

  async findAllByUserId(userId: string): Promise<Project[]> {
    return this.project.findAll({
      include: [
        {
          model: Client,
        },
        {
          model: User,
          where: { id: userId },
          include: [
            {
              model: Profile,
              include: [
                {
                  model: File,
                },
              ],
            },
          ],
        },
        {
          model: File,
        },
      ],
    });
  }

  async getCountByUserId(userId: string): Promise<number> {
    const response = (await this.project.findOne({
      attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
      include: [
        {
          model: User,
          attributes: [],
          where: {
            id: userId,
          },
        },
      ],
      group: ['Project.id'],
      raw: true,
    })) as StatisticCount;
    return Number(response.count);
  }

  async getAllCount(): Promise<number> {
    return await this.project.count();
  }

  async getAllStatistic(): Promise<ProjectStatistic[]> {
    return (await this.project.sequelize.query(
      'SELECT "projects"."name",ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours"' +
        ' FROM "projects" INNER JOIN "loggedDays" ON "projects"."id" = "loggedDays"."projectId"' +
        ' GROUP BY "projects"."id"',
      { type: QueryTypes.SELECT },
    )) as ProjectStatistic[];
  }

  async getStatisticByProjectId(projectId: string): Promise<UserStatistic[]> {
    return (await this.project.sequelize.query(
      'SELECT "profiles"."firstName","profiles"."lastName","files"."path",' +
        ' ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" ' +
        ' FROM "projects"' +
        ' INNER JOIN "projectUsers" ON "projects"."id" = "projectUsers"."projectId"' +
        ' INNER JOIN "users" ON "projectUsers"."userId" = "users"."id"' +
        ' INNER JOIN "loggedDays" ON "users"."id" = "loggedDays"."userId" ' +
        ' INNER JOIN "profiles" ON "users"."id" = "profiles"."userId" ' +
        ' LEFT JOIN "files" ON "profiles"."avatarId" = "files"."id"' +
        ' WHERE "projects"."id" = :projectId' +
        ' GROUP BY "profiles"."firstName","profiles"."lastName", "files"."path"',
      { replacements: { projectId: projectId }, type: QueryTypes.SELECT },
    )) as UserStatistic[];
  }

  async getStatisticByUserId(userId: string): Promise<ProjectStatistic[]> {
    return (await this.project.sequelize.query(
      'SELECT "projects"."name",' +
        ' ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" ' +
        ' FROM "projects"' +
        ' INNER JOIN "projectUsers" ON "projects"."id" = "projectUsers"."projectId"' +
        ' INNER JOIN "users" ON "projectUsers"."userId" = "users"."id"' +
        ' INNER JOIN "loggedDays" ON "projects"."id" = "loggedDays"."projectId" ' +
        ' WHERE "users"."id" = :userId' +
        ' GROUP BY "projects"."name"',
      { replacements: { userId: userId }, type: QueryTypes.SELECT },
    )) as ProjectStatistic[];
  }

  async getStatisticByUserIdAndProjectId(userId: string, projectId: string): Promise<LoggedDayStatistic[]> {
    return (await this.project.sequelize.query(
      'SELECT "loggedDays"."date",' +
        ' SUM("loggedDays"."hours") AS "hours", SUM("loggedDays"."minutes") AS "minutes"' +
        ' FROM "projects"' +
        ' INNER JOIN "projectUsers" ON "projects"."id" = "projectUsers"."projectId"' +
        ' INNER JOIN "users" ON "projectUsers"."userId" = "users"."id"' +
        ' INNER JOIN "loggedDays" ON "users"."id" = "loggedDays"."userId" ' +
        ' WHERE "projects"."id" = :projectId' +
        ' AND "users"."id" = :userId' +
        ' GROUP BY "loggedDays"."date"',
      { replacements: { projectId: projectId, userId: userId }, type: QueryTypes.SELECT },
    )) as LoggedDayStatistic[];
  }

  async searchByName(name: string): Promise<Project[]> {
    return this.project.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: User,
          include: [Profile],
        },
        {
          model: Department,
        },
        {
          model: File,
        },
        {
          model: Client,
        },
      ],
    });
  }

  async findByProjectIdAndUserId(projectId: string, userId: string): Promise<Project> {
    return await this.project.findOne({
      where: { id: projectId },
      include: {
        model: User,
        where: { id: userId },
      },
    });
  }

  async findOneWithClient(id: string): Promise<Project> {
    return await this.project.findOne({
      where: { id },
      include: [
        {
          model: Client,
        },
        {
          model: User,
          include: [Profile],
        },
        {
          model: File,
        },
      ],
    });
  }

  async findOneWithClientByUserId(id: string, userId: string): Promise<Project> {
    return await this.project.findOne({
      where: { id },
      include: [
        {
          model: Client,
        },
        {
          model: User,
          where: { id: userId },
          include: [Profile],
        },
        {
          model: File,
        },
      ],
    });
  }

  async findOne(id: string): Promise<Project> {
    return await this.project.findOne({
      where: { id },
      include: [{ model: Client }, { model: User, include: [Profile] }, { model: File }],
    });
  }

  async findOneWithFile(id: string): Promise<Project> {
    return await this.project.findOne({
      where: { id },
      include: ['file'],
    });
  }

  async create(name: string, clientId: string, imageId: string): Promise<Project> {
    return await this.project.create(
      {
        name,
        clientId,
        imageId,
      },
      {
        include: User,
      },
    );
  }

  async update(id: string, projectData: ProjectData): Promise<Project> {
    const updatedData = await this.project.update(projectData, {
      where: { id },
      returning: true,
    });
    return mappingUpdateResponse<Project>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.project.destroy({
      where: { id },
    });
  }
}
