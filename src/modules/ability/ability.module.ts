import { Module } from '@nestjs/common';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { AccessService } from '../access/access.service';

@Module({
  providers: [AbilityFactory, AccessService],
  exports: [AbilityFactory],
})
export class AbilityModule {}
