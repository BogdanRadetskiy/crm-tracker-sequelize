import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { arrayInMultipartRequestHelper, ArrayStringInDtoValidation } from '@common/validation';

export class UpdateProjectRequestDto {
  @ApiProperty({ description: 'Project Name', example: 'Esta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client ID', example: '9878f24c-6b96-43cd-a1c4-69c66c875827' })
  @IsUUID(4)
  clientId: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  file?: Express.Multer.File;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['9878f24c-6b96-43cd-a1c4-69c66c875827'],
    description: 'Array of performer ids',
  })
  @Expose()
  @Transform(({ value }) => arrayInMultipartRequestHelper(value))
  @Validate(ArrayStringInDtoValidation, {
    each: true,
    message: 'Industry required Validation error',
  })
  @IsUUID(4, { each: true })
  performerIds: string[];
}
