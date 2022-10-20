import { IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetLoggedDaysFilterRequestDto {
  @ApiPropertyOptional({ description: 'Choose "Date from" (rrrr-mm-dd)' })
  @IsDateString()
  dateFrom: Date;

  @ApiPropertyOptional({ description: 'Choose "Date to" (rrrr-mm-dd)' })
  @IsDateString()
  dateTo: Date;
}
