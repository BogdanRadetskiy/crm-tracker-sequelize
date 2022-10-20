import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FileService } from '@modules/file/file.service';
import { File } from '@shared/models';
import { FileRepository } from '@shared/repositories';

@Module({
  imports: [SequelizeModule.forFeature([File])],
  providers: [FileService, FileRepository],
  exports: [FileService, FileRepository],
})
export class FileModule {}
