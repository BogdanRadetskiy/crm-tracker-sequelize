import { Module } from '@nestjs/common';

import { UserService } from '@modules/user/user.service';

import { RoleModule } from '@modules/role/role.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { UserController } from '@modules/user/user.controller';
import { FileService } from '@modules/file/file.service';
import { DepartmentModule } from '@modules/department/department.module';
import { ProfileService } from '@modules/profile/profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Access, Department, File, Profile, User } from '@shared/models';
import { AccessRepository, FileRepository, ProfileRepository, UserRepository } from '@shared/repositories';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '@modules/access/access.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Access, File, Profile, Department]),
    RoleModule,
    ProfileModule,
    DepartmentModule,
  ],
  providers: [
    UserService,
    FileService,
    ProfileService,
    UserRepository,
    FileRepository,
    ProfileRepository,
    AbilityFactory,
    AccessService,
    AccessRepository,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
