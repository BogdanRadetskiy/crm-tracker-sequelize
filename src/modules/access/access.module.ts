import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Access, Department, File, Profile, Role, User } from '@shared/models';
import { AccessController } from '@modules/access/access.controller';
import { AccessService } from '@modules/access/access.service';
import {
  AccessRepository,
  DepartmentRepository,
  FileRepository,
  ProfileRepository,
  RoleRepository,
  UserRepository,
} from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { UserService } from '@modules/user/user.service';
import { RoleService } from '@modules/role/role.service';
import { ProfileService } from '@modules/profile/profile.service';
import { FileService } from '@modules/file/file.service';
import { DepartmentService } from '@modules/department/department.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, Access, User, Role, Profile, File, Department])],
  controllers: [AccessController],
  providers: [
    AccessService,
    AccessRepository,
    AbilityFactory,
    UserRepository,
    UserService,
    RoleService,
    ProfileService,
    FileService,
    DepartmentService,
    RoleRepository,
    ProfileRepository,
    FileRepository,
    DepartmentRepository,
  ],
  exports: [AccessService, AccessRepository],
})
export class AccessModule {}
