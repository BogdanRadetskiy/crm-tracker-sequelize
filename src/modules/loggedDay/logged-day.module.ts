import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { LoggedDayService } from '@modules/loggedDay/logged-day.service';
import { LoggedDayController } from '@modules/loggedDay/logged-day.controller';
import { ProjectService } from '@modules/project/project.service';
import { ClientService } from '@modules/client/client.service';
import { UserService } from '@modules/user/user.service';
import { FileService } from '@modules/file/file.service';
import { ProfileService } from '@modules/profile/profile.service';
import { DepartmentService } from '@modules/department/department.service';
import { RoleService } from '@modules/role/role.service';
import { Access, Client, Department, File, Job, LoggedDay, Profile, Project, Role, User } from '@shared/models';
import {
  LoggedDayRepository,
  ProjectRepository,
  ClientRepository,
  UserRepository,
  FileRepository,
  ProfileRepository,
  DepartmentRepository,
  RoleRepository,
  AccessRepository,
  JobRepository,
} from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '@modules/access/access.service';
import { JobService } from '@modules/job/job.service';

@Module({
  imports: [
    SequelizeModule.forFeature([LoggedDay, User, Access, Project, Client, File, Profile, Department, Job, Role]),
  ],
  controllers: [LoggedDayController],
  providers: [
    LoggedDayRepository,
    LoggedDayService,
    ProjectService,
    ProjectRepository,
    ClientService,
    ClientRepository,
    UserService,
    UserRepository,
    FileService,
    FileRepository,
    ProfileService,
    ProfileRepository,
    DepartmentService,
    DepartmentRepository,
    RoleService,
    JobService,
    JobRepository,
    RoleRepository,
    AbilityFactory,
    AccessService,
    AccessRepository,
  ],
})
export class LoggedDayModule {}
