import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CreateProjectRequestDto, UpdateProjectRequestDto } from '@modules/project/dto';

import { UploadFileInterface } from '@common/interfaces/file';
import { FileService } from '@modules/file/file.service';
import { UserService } from '@modules/user/user.service';
import { ClientService } from '@modules/client/client.service';
import { Client, File, Project, User } from '@shared/models';
import { ProjectRepository } from '@shared/repositories';
import { LoggedDayStatistic, ProjectStatistic, UserStatistic } from '@common/types/statistic';
import { UserRoleEnum } from '@common/enums/users';
import { ProjectData } from '@common/types/project';
import { DEFAULT_COUNT } from '@common/constants';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    @InjectPinoLogger(ProjectService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getAll(user: User): Promise<Project[]> {
    return user.role.type === UserRoleEnum.ADMIN
      ? await this.projectRepository.findAll()
      : await this.projectRepository.findAllByUserId(user.id);
  }

  async getCount(userId: string, projectId: string): Promise<number> {
    if (projectId) {
      return DEFAULT_COUNT;
    }
    if (userId) {
      return await this.projectRepository.getCountByUserId(userId);
    }
    return await this.projectRepository.getAllCount();
  }

  async getByGrouped(
    userId: string,
    projectId: string,
  ): Promise<UserStatistic[] | ProjectStatistic[] | LoggedDayStatistic[]> {
    if (!projectId && !userId) {
      return await this.projectRepository.getAllStatistic();
    } else if (!userId) {
      return await this.projectRepository.getStatisticByProjectId(projectId);
    } else if (!projectId) {
      return await this.projectRepository.getStatisticByUserId(userId);
    } else {
      return await this.projectRepository.getStatisticByUserIdAndProjectId(userId, projectId);
    }
  }

  async findById(id: string, user?: User): Promise<Project> {
    return user.role.type === UserRoleEnum.ADMIN
      ? await this.projectRepository.findOneWithClient(id)
      : await this.projectRepository.findOneWithClientByUserId(id, user.id);
  }

  async searchByName(name: string): Promise<Project[]> {
    return this.projectRepository.searchByName(name);
  }

  async findByProjectIdAndUserId(projectId: string, userId: string): Promise<Project> {
    return await this.projectRepository.findByProjectIdAndUserId(projectId, userId);
  }

  async create(data: CreateProjectRequestDto, fileData?: UploadFileInterface): Promise<Project> {
    try {
      const client: Client = await this.clientService.findById(data.clientId);
      let imageId: string | null = null;
      if (!client) {
        throw new NotFoundException(`There isn't any client with id: ${data.clientId}`);
      }
      let file: File;
      if (fileData) {
        file = await this.fileService.save(fileData);
        imageId = file.id;
      }

      let users: User[] = [];

      if (data.performerIds.length) {
        users = await this.userService.findFromArray(data.performerIds);
      }
      const project: Project = await this.projectRepository.create(data.name, client.id, imageId);
      await project.$add('users', users);
      await project.$set('client', client);
      project.users = users;
      project.client = client;
      project.file = file;
      return project;
    } catch (error) {
      this.logger.error({ error, data }, 'Project:create');
      throw new InternalServerErrorException(
        error instanceof NotFoundException ? error.message : 'Error create project',
      );
    }
  }

  async update(id: string, dto: UpdateProjectRequestDto, fileData?: UploadFileInterface): Promise<Project> {
    try {
      const project: Project = await this.projectRepository.findOne(id);
      if (!project) {
        throw new NotFoundException(`There isn't any project with id: ${id}`);
      }

      const client: Client = await this.clientService.findById(dto.clientId);

      if (!client) {
        throw new NotFoundException(`There isn't any client with id: ${dto.clientId}`);
      }
      let file: File;
      let users: User[] = [];

      if (dto.performerIds.length) {
        users = await this.userService.findFromArray(dto.performerIds);
      }
      const projectData: ProjectData = {
        name: dto.name,
        clientId: client.id,
      };
      if (fileData) {
        file = await this.fileService.save(fileData);
        await this.fileService.delete(project.file);
        projectData.imageId = file.id;
      }
      const updatedData = await this.projectRepository.update(id, projectData);
      await project.$set('users', users);
      updatedData.users = users;
      updatedData.file = file;
      updatedData.client = client;
      return updatedData;
    } catch (error) {
      this.logger.error({ error, id, dto }, 'Project:update');
      throw new InternalServerErrorException(
        error instanceof NotFoundException ? error.message : 'Error update project',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const project = await this.projectRepository.findOneWithFile(id);

      if (!project) {
        throw new NotFoundException(`There isn't any project with id: ${id}`);
      }
      await this.projectRepository.delete(id);
      await this.fileService.delete(project.file);
    } catch (error) {
      this.logger.error({ error, id }, 'Project:delete');
      throw new InternalServerErrorException(
        error instanceof NotFoundException ? error.message : 'Error delete project',
      );
    }
  }
}
