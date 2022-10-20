import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDepartmentRequestDto } from '@modules/department/dto';
import { Department } from '@shared/models';
import { DepartmentRepository } from '@shared/repositories';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async getAll(): Promise<Department[]> {
    return this.departmentRepository.findAll();
  }

  async getById(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne(id);

    if (!department) {
      throw new NotFoundException(`There isn't any department with id: ${id}`);
    }

    return department;
  }

  async create(data: CreateDepartmentRequestDto): Promise<Department> {
    return await this.departmentRepository.create(data);
  }

  async delete(id: string): Promise<void> {
    return await this.departmentRepository.delete(id);
  }
}
