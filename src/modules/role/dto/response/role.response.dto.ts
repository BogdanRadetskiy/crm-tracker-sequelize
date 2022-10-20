import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

import { UserRoleEnum } from '@common/enums/users';
import { Role } from '@shared/models';

export class RoleResponseDto {
  @ApiProperty()
  @Expose()
  type: UserRoleEnum;

  public static mapFrom(data: Role): RoleResponseDto {
    return plainToClass(RoleResponseDto, data, { excludeExtraneousValues: true });
  }
}
