import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';

import { Access } from '@shared/models';

export class AccessResponseDto {
  @ApiProperty()
  @Expose()
  module: string;

  @ApiProperty()
  @Expose()
  method: string;

  @ApiProperty()
  @Expose()
  permission: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.role)
  @Expose()
  role: string;

  public static mapFrom(data: Access): AccessResponseDto {
    const access = plainToClass(AccessResponseDto, data, { excludeExtraneousValues: true });

    return { ...access };
  }

  public static mapFromMulti<P>(data: Access[]): AccessResponseDto[] {
    return data.map(AccessResponseDto.mapFrom);
  }
}
