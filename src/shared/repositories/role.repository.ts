import { InjectModel } from '@nestjs/sequelize';
import { Role } from '@shared/models';

export class RoleRepository {
  constructor(
    @InjectModel(Role)
    private readonly role: typeof Role,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.role.findAll({
      attributes: ['type'],
      raw: true,
      nest: true,
    });
  }

  async findOneUser(): Promise<Role> {
    return await this.role.findOne({
      where: { type: 'user' },
    });
  }

  async findOneAdmin(): Promise<Role> {
    return await this.role.findOne({
      where: { type: 'admin' },
    });
  }
}
