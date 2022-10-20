import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

import { Job } from '@shared/models';

export class JobResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;

  public static mapFrom(data: Job): JobResponseDto {
    return plainToClass(JobResponseDto, data, { excludeExtraneousValues: true });
  }

  public static mapFromMulti<P>(data: Job[]): JobResponseDto[] {
    return data.map(JobResponseDto.mapFrom);
  }
}
