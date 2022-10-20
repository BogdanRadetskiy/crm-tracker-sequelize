import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SingleFileRequestDto {
  @ApiProperty({ description: 'file url' })
  @IsString()
  @IsNotEmpty()
  file: string;
}
