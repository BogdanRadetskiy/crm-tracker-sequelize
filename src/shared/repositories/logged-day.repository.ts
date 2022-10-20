import { InjectModel } from '@nestjs/sequelize';
import { Client, Department, Job, LoggedDay, Profile, Project, User } from '@shared/models';
import { Op, QueryTypes } from 'sequelize';
import { CreateLoggedDayRequestDto, UpdateLoggedDayRequestDto } from '@modules/loggedDay/dto';
import { mappingTimeResponse, mappingUpdateResponse } from '@shared/helpers';
import { TimeType } from '@common/types';

export class LoggedDayRepository {
  constructor(
    @InjectModel(LoggedDay)
    private readonly loggedDays: typeof LoggedDay,
  ) {}

  async findById(id: string): Promise<LoggedDay> {
    return await this.loggedDays.findOne({
      where: { id },
      include: [
        {
          model: User,
          include: [Profile, Department],
        },
        {
          model: Project,
          include: [Client],
        },
      ],
    });
  }

  async findByIdAndUserId(id: string, userId: string): Promise<LoggedDay> {
    return await this.loggedDays.findOne({
      where: { id },
      include: [
        {
          model: User,
          where: { id: userId },
          include: [Profile, Department],
        },
        {
          model: Project,
          include: [Client],
        },
      ],
    });
  }

  async getAllHours(): Promise<TimeType> {
    const updatedData = await this.loggedDays.sequelize.query(
      'SELECT ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" FROM "loggedDays"',
      { type: QueryTypes.SELECT },
    );
    return mappingTimeResponse(updatedData);
  }
  async getHoursByProjectId(projectId: string): Promise<TimeType> {
    const updatedData = await this.loggedDays.sequelize.query(
      'SELECT ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" FROM "loggedDays" WHERE "projectId" = :id',
      {
        replacements: {
          id: projectId,
        },
        type: QueryTypes.SELECT,
      },
    );
    return mappingTimeResponse(updatedData);
  }
  async getHoursByUserId(userId: string): Promise<TimeType> {
    const updatedData = await this.loggedDays.sequelize.query(
      'SELECT ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" FROM "loggedDays" WHERE "userId" = :userId',
      {
        replacements: { userId: userId },
        type: QueryTypes.SELECT,
      },
    );
    return mappingTimeResponse(updatedData);
  }
  async getHoursByUserIdAndProjectId(userId: string, projectId: string): Promise<TimeType> {
    const updatedData = await this.loggedDays.sequelize.query(
      'SELECT ROUND(SUM("loggedDays"."minutes"/60 + "loggedDays"."hours")) AS "hours" FROM "loggedDays" WHERE "userId" = :userId AND "projectId" = :projectId',
      {
        replacements: { userId: userId, projectId: projectId },
        type: QueryTypes.SELECT,
      },
    );
    return mappingTimeResponse(updatedData);
  }

  async findAll(from, to): Promise<LoggedDay[]> {
    return await this.loggedDays.findAll({
      where: { date: { [Op.between]: [from, to] } },
      include: [
        {
          model: User,
          include: [Profile, Department],
        },
        {
          model: Job,
        },
        {
          model: Project,
          include: [Client],
        },
      ],
    });
  }

  async findAllByUserId(from, to, userId): Promise<LoggedDay[]> {
    return await this.loggedDays.findAll({
      where: { date: { [Op.between]: [from, to] } },
      include: [
        {
          model: User,
          where: { id: userId },
          include: [Profile, Department],
        },
        {
          model: Job,
        },
        {
          model: Project,
          include: [Client],
        },
      ],
    });
  }

  async create(data: CreateLoggedDayRequestDto, user: User): Promise<LoggedDay> {
    return await this.loggedDays.create({
      date: data.date,
      hours: data.hours,
      minutes: data.minutes,
      userId: user.id,
      description: data.description,
    });
  }

  async update(id: string, data: UpdateLoggedDayRequestDto): Promise<LoggedDay> {
    const updatedData = await this.loggedDays.update(
      {
        date: data.date,
        hours: data.hours,
        minutes: data.minutes,
        description: data.description,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.loggedDays.destroy({
      where: { id },
    });
  }
}
