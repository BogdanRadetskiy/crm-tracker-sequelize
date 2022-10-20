import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DepartmentService } from '@modules/department/department.service';
import { DepartmentController } from '@modules/department/department.controller';
import { Access, Department, File, Profile, Role, User } from '@shared/models';
import {
  AccessRepository,
  DepartmentRepository,
  FileRepository,
  ProfileRepository,
  RoleRepository,
  UserRepository,
} from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '@modules/access/access.service';
import { UserService } from '@modules/user/user.service';
import { ProfileService } from '@modules/profile/profile.service';
import { FileService } from '@modules/file/file.service';
import { RoleService } from '@modules/role/role.service';

@Module({
  imports: [SequelizeModule.forFeature([Department, Access, User, Role, Profile, File])],
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    DepartmentRepository,
    AbilityFactory,
    AccessService,
    AccessRepository,
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    FileService,
    FileRepository,
    RoleService,
    RoleRepository,
  ],
  exports: [DepartmentService],
})
export class DepartmentModule {}
