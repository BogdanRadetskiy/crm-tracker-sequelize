import { Module } from '@nestjs/common';

import { RoleService } from '@modules/role/role.service';
import { Role } from '@shared/models';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleRepository } from '@shared/repositories';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
