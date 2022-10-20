import { Injectable } from '@nestjs/common';

import { JobRepository } from '@shared/repositories';
import { JobRequestDto } from '@modules/job/dto/request';
import { Job } from '@shared/models';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async getById(id: string): Promise<Job> {
    return await this.jobRepository.findOne(id);
  }

  async getAll(): Promise<Job[]> {
    return await this.jobRepository.findAll();
  }

  async create(data: JobRequestDto): Promise<Job> {
    return await this.jobRepository.create(data);
  }

  async update(data: JobRequestDto, id: string): Promise<void> {
    await this.jobRepository.update(data, id);
  }

  async delete(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
