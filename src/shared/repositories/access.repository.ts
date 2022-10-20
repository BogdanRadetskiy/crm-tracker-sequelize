import { InjectModel } from '@nestjs/sequelize';
import { Access, Role } from '@shared/models';
import { UserRoleEnum } from '@common/enums/users';

export class AccessRepository {
  constructor(
    @InjectModel(Access)
    private readonly access: typeof Access,
  ) {}

  async getAllAccesses(): Promise<Access[]> {
    return await this.access.findAll({
      include: {
        model: Role,
      },
    });
  }

  async getAccesses(role: UserRoleEnum): Promise<Access[]> {
    return await this.access.findAll({
      where: { permission: true },
      include: {
        model: Role,
        where: { type: role },
      },
      raw: true,
      nest: true,
    });
  }
}
