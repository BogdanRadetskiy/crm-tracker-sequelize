import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
  CreateLoggedDayRequestDto,
  UpdateLoggedDayRequestDto,
  GetLoggedDaysFilterRequestDto,
} from '@modules/loggedDay/dto';
import { ProjectService } from '@modules/project/project.service';
import { LoggedDay, User } from '@shared/models';
import { LoggedDayRepository } from '@shared/repositories';
import { UserRoleEnum } from '@common/enums/users';
import { TimeType } from '@common/types';
import { JobService } from '@modules/job/job.service';

@Injectable()
export class LoggedDayService {
  constructor(
    private readonly loggedDayRepository: LoggedDayRepository,
    private readonly projectService: ProjectService,
    private readonly jobService: JobService,
    @InjectPinoLogger(LoggedDayService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getAll(filterDto: GetLoggedDaysFilterRequestDto, user: User): Promise<LoggedDay[]> {
    if (!filterDto.dateFrom || !filterDto.dateTo) {
      throw new NotFoundException(`There isn't any logged day with id: ${filterDto}`);
    }
    return user.role.type === UserRoleEnum.ADMIN
      ? await this.loggedDayRepository.findAll(filterDto.dateFrom, filterDto.dateTo)
      : await this.loggedDayRepository.findAllByUserId(filterDto.dateFrom, filterDto.dateTo, user.id);
  }

  async getHours(userId: string, projectId: string): Promise<number> {
    let response: TimeType;
    if (!projectId && !userId) {
      response = await this.loggedDayRepository.getAllHours();
    } else if (!userId) {
      response = await this.loggedDayRepository.getHoursByProjectId(projectId);
    } else if (!projectId) {
      response = await this.loggedDayRepository.getHoursByUserId(userId);
    } else {
      response = await this.loggedDayRepository.getHoursByUserIdAndProjectId(userId, projectId);
    }
    return Number(response.hours);
  }

  async findById(id: string, user: User): Promise<LoggedDay> {
    // TODO(alex):change this
    return user.role.type === UserRoleEnum.ADMIN
      ? await this.loggedDayRepository.findById(id)
      : await this.loggedDayRepository.findByIdAndUserId(id, user.id);
  }

  async create(data: CreateLoggedDayRequestDto, user: User): Promise<LoggedDay> {
    const project = await this.projectService.findById(data.projectId, user);
    if (!project) {
      throw new NotFoundException(`Project not found`);
    }
    const loggedDay = await this.loggedDayRepository.create(data, user);
    const job = await this.jobService.getById(data.jobId);
    if (!job) {
      throw new NotFoundException(`Job not found`);
    }
    await loggedDay.$set('job', job);
    loggedDay.job = job;
    return loggedDay;
  }

  async update(id: string, data: UpdateLoggedDayRequestDto, user: User): Promise<void> {
    try {
      const loggedDay = await this.loggedDayRepository.findById(id);

      if (!loggedDay) {
        throw new NotFoundException(`There isn't any logged day with id: ${id}`);
      }
      const project =
        user.role.type === UserRoleEnum.ADMIN
          ? await this.projectService.findByProjectIdAndUserId(data.projectId, loggedDay.userId)
          : await this.projectService.findByProjectIdAndUserId(data.projectId, user.id);

      if (!project) {
        throw new NotFoundException(`Project not found`);
      }

      const job = await this.jobService.getById(data.jobId);
      if (!job) {
        throw new NotFoundException(`Job not found`);
      }
      await this.loggedDayRepository.update(id, data);
      await loggedDay.$set('project', project);
      await loggedDay.$set('job', job);
    } catch (error) {
      this.logger.error({ error, id, data }, 'Logged-day.service:update');
      throw new InternalServerErrorException(
        error instanceof NotFoundException ? error.message : 'Error update logged day',
      );
    }
  }

  async delete(id: string): Promise<void> {
    await this.loggedDayRepository.delete(id);
  }
}
