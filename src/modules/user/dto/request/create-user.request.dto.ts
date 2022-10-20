import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'User email', example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User FirstName', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User LastName', example: 'Grabovsky' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User phone number', example: '+380636479067' })
  @IsPhoneNumber()
  phone?: string;
}
