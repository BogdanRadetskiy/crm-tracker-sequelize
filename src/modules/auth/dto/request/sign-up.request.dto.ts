import { IsDefined, IsNotEmpty, IsEmail, MinLength, Matches, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Match } from '@shared/decorators';
import { minLengthAuthValidation } from '@common/constants';

export class SignUpRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  @Match('password')
  passwordConfirm: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}
