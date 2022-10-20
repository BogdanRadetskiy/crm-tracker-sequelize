import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { azureConfig } from '@shared/configs/azure.config';

import { StrategiesEnum } from '@common/enums/strategies/strategies.enum';
import { UserProviderEnum } from '@common/enums/users';
import { AzureResponseInterface } from '@common/interfaces/azure';
import { ProviderService } from '@modules/provider/provider.service';
import { UserService } from '@modules/user/user.service';
import { User } from '@shared/models';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, StrategiesEnum.AZURE) {
  constructor(private readonly providerService: ProviderService, private readonly userService: UserService) {
    super(azureConfig);
  }

  async validate(response: AzureResponseInterface): Promise<User | Error> {
    if (!response.oid) throw new Error('Azure response has no Oid');
    const provider = await this.providerService.getProviderByTypeAndOid(response.oid, UserProviderEnum.MICROSOFT);
    if (provider?.user) {
      return provider.user;
    } else {
      // check is email exist
      const hasVerifiedEmail = response.verified_primary_email.length >= 1;
      const hasEmail = response.email || false;

      let email = null;
      if (hasVerifiedEmail) {
        email = response.verified_primary_email[0];
      } else if (hasEmail) {
        email = response.email;
      }

      if (!email) return new Error('User has no email');

      const [firstName, lastName] = response.name.split(' ');
      const data = { email, firstName, lastName };
      const user = await this.userService.create(data);
      await this.providerService.create({ oid: response.oid, userId: user.id });
      return user;
    }
  }
}
