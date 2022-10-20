import { InjectModel } from '@nestjs/sequelize';

import { UploadFileInterface } from '@common/interfaces/file';
import { File } from '@shared/models';

export class FileRepository {
  constructor(
    @InjectModel(File)
    private readonly file: typeof File,
  ) {}

  async findOne(id: string): Promise<File> {
    return await this.file.findOne({
      where: { id },
    });
  }

  async create(fileData: UploadFileInterface): Promise<File> {
    return await this.file.create(fileData);
  }

  async delete(id: string): Promise<void> {
    await this.file.destroy({
      where: { id },
    });
  }
}
