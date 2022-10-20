import { Module } from '@nestjs/common';

import { ProviderService } from '@modules/provider/provider.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProvider } from '@shared/models';
import { ProviderRepository } from '@shared/repositories';

@Module({
  imports: [SequelizeModule.forFeature([UserProvider])],
  providers: [ProviderService, ProviderRepository],
  exports: [ProviderService],
})
export class AuthModule {}
