import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';
import {
  maxLoggedDayHourValidation,
  maxLoggedDayMinuteValidation,
  minLoggedDayHourValidation,
  minLoggedDayMinuteValidation,
} from '@common/constants';

export class CreateLoggedDayRequestDto {
  @ApiProperty({ description: 'hours worked', example: 2 })
  @IsNumber()
  @Min(minLoggedDayHourValidation)
  @Max(maxLoggedDayHourValidation)
  hours: number;

  @ApiProperty({ description: 'minutes worked', example: 30 })
  @IsNumber()
  @Min(minLoggedDayMinuteValidation)
  @Max(maxLoggedDayMinuteValidation)
  minutes: number;

  @ApiProperty({ description: 'task description', example: 'super hard task' })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ description: 'project uuid', example: 'cd9d51b5-af60-4736-84ac-f4c6784d69a3' })
  @IsUUID(4)
  projectId: string;

  @ApiProperty({ description: 'job uuid', example: 'cd9d51b5-af60-4736-84ac-f4c6784d69a3' })
  @IsUUID(4)
  jobId: string;

  @ApiProperty({ description: 'day timestamp', example: new Date().toISOString() })
  @IsDateString()
  date: Date;
}
