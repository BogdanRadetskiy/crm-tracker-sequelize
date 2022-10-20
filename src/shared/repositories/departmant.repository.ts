import { InjectModel } from '@nestjs/sequelize';

import { CreateDepartmentRequestDto } from '@modules/department/dto';
import { Department } from '@shared/models';

export class DepartmentRepository {
  constructor(
    @InjectModel(Department)
    private readonly department: typeof Department,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.department.findAll();
  }

  async findOne(id: string): Promise<Department> {
    return await this.department.findOne({
      where: { id },
    });
  }

  async create(data: CreateDepartmentRequestDto): Promise<Department> {
    return await this.department.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.department.destroy({
      where: { id },
    });
  }
}
