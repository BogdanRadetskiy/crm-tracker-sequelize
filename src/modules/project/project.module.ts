import { Module } from '@nestjs/common';

import { ProjectService } from '@modules/project/project.service';
import { ProjectController } from '@modules/project/project.controller';
import { FileService } from '@modules/file/file.service';
import { UserService } from '@modules/user/user.service';
import { ProfileService } from '@modules/profile/profile.service';
import { DepartmentService } from '@modules/department/department.service';
import { RoleService } from '@modules/role/role.service';
import { ClientService } from '@modules/client/client.service';
import { Access, Client, Department, File, Profile, Project, Role, User } from '@shared/models';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  ProjectRepository,
  ClientRepository,
  RoleRepository,
  DepartmentRepository,
  ProfileRepository,
  UserRepository,
  FileRepository,
  AccessRepository,
} from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '@modules/access/access.service';

@Module({
  imports: [SequelizeModule.forFeature([Project, Client, User, File, Profile, Department, Role, Access])],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectRepository,
    FileService,
    FileRepository,
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    DepartmentService,
    DepartmentRepository,
    RoleService,
    RoleRepository,
    ClientService,
    ClientRepository,
    AbilityFactory,
    AccessService,
    AccessRepository,
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
