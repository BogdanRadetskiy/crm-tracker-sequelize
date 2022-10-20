import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';

import { UserSignUpInterface } from '@common/interfaces/user';
import { UpdateUserRequestDto } from '@modules/user/dto';
import { Department, File, Profile, Project, Role, User } from '@shared/models';
import { RoleService } from '@modules/role/role.service';
import { StatisticCount } from '@common/types/statistic';
import { mappingUpdateResponse } from '@shared/helpers';

export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async findOneEmail(email: string): Promise<User> {
    return await this.user.findOne({
      where: { email },
    });
  }

  async getAllCount(): Promise<number> {
    return this.user.count();
  }

  async getCountByProjectId(projectId: string): Promise<number> {
    const response = (await this.user.findOne({
      attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
      include: [
        {
          model: Project,
          attributes: [],
          where: {
            id: projectId,
          },
        },
      ],
      group: ['User.id'],
      raw: true,
    })) as StatisticCount;
    return Number(response.count);
  }

  async findOneWithFileAndDepartment(id: string): Promise<User> {
    return await this.user.findOne({
      where: { id },
      include: [
        {
          model: Profile,
          include: [File],
        },
        {
          model: Department,
        },
      ],
    });
  }

  async findOneWithProfileAndDepartment(id: string): Promise<User> {
    return await this.user.findOne({
      where: { id },
      include: [
        {
          model: Profile,
          include: [File],
        },
        {
          model: Department,
        },
        {
          model: Role,
        },
      ],
    });
  }

  async searchByName(name: string): Promise<User[]> {
    return await this.user.findAll({
      include: {
        model: Profile,
        where: {
          [Op.or]: [
            {
              firstName: { [Op.iLike]: `%${name}%` },
            },
            {
              lastName: { [Op.iLike]: `%${name}%` },
            },
          ],
        },
        include: [File],
      },
    });
  }

  async findAllWithProfile(id: string[]): Promise<User[]> {
    return await this.user.findAll({
      where: { id },
      include: ['profile'],
    });
  }

  async findAllWithFileAndDepartment(): Promise<User[]> {
    return await this.user.findAll({
      include: [
        {
          model: Profile,
          include: [File],
        },
        {
          model: Department,
        },
      ],
    });
  }

  async findOneWithFile(id: string): Promise<User> {
    return await this.user.findOne({
      where: { id },
      include: [
        {
          model: Profile,
          include: [File],
        },
      ],
    });
  }

  async updateUser(id: string): Promise<User> {
    const role = await this.roleService.getAdminRole();
    const updatedData = await this.user.update(
      {
        roleId: role.id,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<User>(updatedData);
  }

  async create(data: UserSignUpInterface, roleId: string): Promise<User> {
    return await this.user.create({ ...data, roleId });
  }

  async update(id: string, data: UpdateUserRequestDto, departmentId: string): Promise<User> {
    const updatedData = await this.user.update(
      {
        departmentId,
        email: data.email,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<User>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.user.destroy({
      where: { id },
    });
  }
}
