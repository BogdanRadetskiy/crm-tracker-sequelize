import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JobRequestDto {
  @ApiPropertyOptional({ description: 'Job name' })
  @IsString()
  name: string;
}
