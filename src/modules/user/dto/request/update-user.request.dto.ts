import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsString, IsNotEmpty, IsUUID, IsPhoneNumber, IsEmail, IsOptional, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { arrayInMultipartRequestHelper, ArrayStringInDtoValidation } from '@common/validation';

export class UpdateUserRequestDto {
  @ApiProperty({ description: 'User  FirstName', example: 'Alex' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User LastName', example: 'Bin' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: [
      'UI/UX Design (WEB/Mobile)',
      'Wireframing',
      'Prototyping',
      'User Research',
      'Interaction design',
      'Responsive Web Design',
      'CJM',
    ],
    description: 'Array of skills',
  })
  @Transform(({ value }) => arrayInMultipartRequestHelper(value))
  @Validate(ArrayStringInDtoValidation, {
    each: true,
    message: 'Industry required Validation error',
  })
  @IsOptional()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ description: 'User phone number', example: '+380636479067' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsString()
  file?: Express.Multer.File;

  @ApiProperty({ description: 'Department ID', example: '7fd524bc-ebaa-4a34-8202-6fa0cb1e3878' })
  @IsUUID(4)
  departmentId: string;
}
