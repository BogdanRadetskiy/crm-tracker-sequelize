import { ApiProperty } from '@nestjs/swagger';
import { IsString, ArrayNotEmpty } from 'class-validator';

export class MultipleFileRequestDto {
  @ApiProperty({ description: 'file urls' })
  @ArrayNotEmpty()
  @IsString({ each: true })
  files: string[];
}
