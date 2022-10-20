import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PathFileResponseDto {
  @ApiProperty()
  @Expose()
  @Type(() => PathFileResponseDto)
  path: PathFileResponseDto;
}
