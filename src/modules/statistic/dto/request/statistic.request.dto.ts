import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class StatisticRequestDto {
  @ApiPropertyOptional({ description: 'UserId' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({ description: 'ProjectId' })
  @IsOptional()
  @IsUUID()
  projectId?: string;
}
