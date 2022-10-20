import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ClientController } from '@modules/client/client.controller';
import { ClientService } from '@modules/client/client.service';
import { FileService } from '@modules/file/file.service';
import { Access, Client, Department, File, Profile, Role, User } from '@shared/models';
import {
  AccessRepository,
  ClientRepository,
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
import { DepartmentService } from '@modules/department/department.service';
import { RoleService } from '@modules/role/role.service';

@Module({
  imports: [SequelizeModule.forFeature([Client, File, Access, User, Profile, Department, Role])],
  controllers: [ClientController],
  providers: [
    ClientService,
    FileService,
    ClientRepository,
    FileRepository,
    AbilityFactory,
    AccessService,
    AccessRepository,
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    FileService,
    FileRepository,
    DepartmentService,
    DepartmentRepository,
    RoleService,
    RoleRepository,
  ],
  exports: [ClientService],
})
export class ClientModule {}
