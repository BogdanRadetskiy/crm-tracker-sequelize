import { InjectModel } from '@nestjs/sequelize';

import { UserProviderEnum } from '@common/enums/users';
import { CreateProviderRequestDto } from '@modules/provider/dto';
import { Profile, Role, User, UserProvider } from '@shared/models';
import { mappingUpdateResponse } from '@shared/helpers';

export class ProviderRepository {
  constructor(
    @InjectModel(UserProvider)
    private readonly provider: typeof UserProvider,
  ) {}

  async create(userProviderData: CreateProviderRequestDto): Promise<UserProvider> {
    return await this.provider.create({ ...userProviderData });
  }

  async update(userId: string, id: number): Promise<UserProvider> {
    const updatedData = await this.provider.update(
      {
        userId: userId,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<UserProvider>(updatedData);
  }

  async findProviderByTypeAndOid(oid: string, providerType: UserProviderEnum): Promise<UserProvider> {
    return await this.provider.findOne({
      where: {
        type: providerType,
        oid,
      },
      include: {
        model: User,
        include: [
          {
            model: Role,
          },
          {
            model: Profile,
          },
        ],
      },
    });
  }
}
