import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleService } from '@modules/role/role.service';
import { Access, Client, Department, File, Job, LoggedDay, Profile, Project, Role, User } from '@shared/models';
import {
  RoleRepository,
  AccessRepository,
  JobRepository,
  UserRepository,
  ProfileRepository,
  FileRepository,
  DepartmentRepository,
} from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '@modules/access/access.service';
import { JobController } from '@modules/job/job.controller';
import { JobService } from '@modules/job/job.service';
import { UserService } from '@modules/user/user.service';
import { ProfileService } from '@modules/profile/profile.service';
import { FileService } from '@modules/file/file.service';
import { DepartmentService } from '@modules/department/department.service';

@Module({
  imports: [
    SequelizeModule.forFeature([LoggedDay, User, Access, Project, Client, Job, File, Profile, Department, Role]),
  ],
  controllers: [JobController],
  providers: [
    JobRepository,
    JobService,
    RoleService,
    RoleRepository,
    AbilityFactory,
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    FileService,
    FileRepository,
    DepartmentService,
    DepartmentRepository,
    AccessService,
    AccessRepository,
  ],
})
export class JobModule {}
