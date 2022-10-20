import { InjectModel } from '@nestjs/sequelize';
import { Job } from '@shared/models';
import { JobRequestDto } from '@modules/job/dto/request';

export class JobRepository {
  constructor(
    @InjectModel(Job)
    private readonly jobs: typeof Job,
  ) {}

  async create(data: JobRequestDto): Promise<Job> {
    return await this.jobs.create(data);
  }

  async findOne(id: string): Promise<Job> {
    return await this.jobs.findOne({ where: { id } });
  }

  async findAll(): Promise<Job[]> {
    return await this.jobs.findAll();
  }

  async update(data: JobRequestDto, id: string): Promise<void> {
    await this.jobs.update({ name: data.name }, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.jobs.destroy({ where: { id } });
  }
}
