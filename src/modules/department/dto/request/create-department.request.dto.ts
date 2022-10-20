import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentRequestDto {
  @ApiProperty({ description: 'Department Name', example: 'Design' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
