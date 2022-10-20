import { UserProviderEnum } from '@common/enums/users';

export class CreateProviderRequestDto {
  type?: UserProviderEnum;

  userId?: string;

  oid: string;
}
