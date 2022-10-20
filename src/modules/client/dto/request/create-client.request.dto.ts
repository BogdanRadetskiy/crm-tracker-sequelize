import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateClientRequestDto {
  @ApiProperty({ description: 'Client Name', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client Name', example: 'esta.com' })
  @IsUrl()
  website: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  file?: Express.Multer.File;
}
