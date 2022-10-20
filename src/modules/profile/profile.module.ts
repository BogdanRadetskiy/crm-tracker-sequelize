import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProfileService } from '@modules/profile/profile.service';
import { FileService } from '@modules/file/file.service';
import { File, Profile, User } from '@shared/models';
import { ProfileRepository, FileRepository } from '@shared/repositories';

@Module({
  imports: [SequelizeModule.forFeature([Profile, File, User])],
  providers: [ProfileService, FileService, ProfileRepository, FileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
