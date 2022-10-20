import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Client, Department, File, Job, LoggedDay, Profile, Project, Role, User } from '@shared/models';
import { ClientService } from '@modules/client/client.service';
import { DepartmentService } from '@modules/department/department.service';
import { FileService } from '@modules/file/file.service';
import { LoggedDayService } from '@modules/loggedDay/logged-day.service';
import { ProfileService } from '@modules/profile/profile.service';
import { ProjectService } from '@modules/project/project.service';
import { RoleService } from '@modules/role/role.service';
import { UserService } from '@modules/user/user.service';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import {
  UserRepository,
  ProjectRepository,
  LoggedDayRepository,
  ProfileRepository,
  DepartmentRepository,
  FileRepository,
  ClientRepository,
  RoleRepository,
  JobRepository,
} from '@shared/repositories';
import { JobService } from '@modules/job/job.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Project, LoggedDay, Profile, Job, File, Role, Department, Client])],
  providers: [
    StatisticService,
    UserService,
    UserRepository,
    ProjectService,
    ProjectRepository,
    LoggedDayService,
    LoggedDayRepository,
    ProfileService,
    ProfileRepository,
    FileService,
    FileRepository,
    DepartmentService,
    DepartmentRepository,
    JobService,
    JobRepository,
    RoleRepository,
    ClientRepository,
    RoleService,
    ClientService,
  ],
  controllers: [StatisticController],
})
export class StatisticModule {}
