import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Client } from '@shared/models';
import { ClientData } from '@common/types/client';
import { mappingUpdateResponse } from '@shared/helpers';

export class ClientRepository {
  constructor(
    @InjectModel(Client)
    private readonly client: typeof Client,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.client.findAll({
      include: ['file'],
    });
  }

  async findOne(id: string): Promise<Client> {
    return await this.client.findOne({
      where: { id },
      include: ['file'],
    });
  }

  async searchByName(name: string): Promise<Client[]> {
    return await this.client.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: ['file'],
    });
  }

  async findOneWithFile(id: string): Promise<Client> {
    return await this.client.findOne({
      where: { id },
      include: ['file'],
    });
  }

  async create(name: string, website: string, avatarId: string): Promise<Client> {
    return await this.client.create({
      name,
      website,
      avatarId,
    });
  }

  async update(id: string, clientData: ClientData): Promise<Client> {
    const updatedData = await this.client.update(clientData, {
      where: { id },
      returning: true,
    });
    return mappingUpdateResponse<Client>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.client.destroy({
      where: { id },
    });
  }
}
