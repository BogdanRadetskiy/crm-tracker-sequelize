import { Injectable } from '@nestjs/common';

import { UserProviderEnum } from '@common/enums/users';
import { CreateProviderRequestDto } from '@modules/provider/dto';
import { UserProvider } from '@shared/models';
import { ProviderRepository } from '@shared/repositories';

@Injectable()
export class ProviderService {
  constructor(private readonly providerRepository: ProviderRepository) {}

  async getProviderByTypeAndOid(oid: string, providerType: UserProviderEnum): Promise<UserProvider | null> {
    return await this.providerRepository.findProviderByTypeAndOid(oid, providerType);
  }

  async create(userProviderData: CreateProviderRequestDto): Promise<UserProvider> {
    return await this.providerRepository.create({ ...userProviderData });
  }

  async update(userId: string, id: number): Promise<UserProvider> {
    return this.providerRepository.update(userId, id);
  }
}
