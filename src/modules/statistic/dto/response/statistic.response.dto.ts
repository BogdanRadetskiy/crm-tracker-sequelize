import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class StatisticHeaderResponseDto {
  @ApiProperty({ description: 'Projects Count', example: 4 })
  @Expose()
  projectsCount: number;

  @ApiProperty({ description: 'Users Count', example: 5 })
  @Expose()
  usersCount: number;

  @ApiProperty({ description: 'All hours', example: 124 })
  @Expose()
  hours: number;

  public static mapFrom(data): StatisticHeaderResponseDto {
    return plainToClass(StatisticHeaderResponseDto, data, { excludeExtraneousValues: true });
  }
}
export class StatisticDiagramResponseDto {
  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  hours: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  minutes: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  path: string;

  public static mapFrom(data): StatisticDiagramResponseDto {
    return plainToClass(StatisticDiagramResponseDto, data, { excludeExtraneousValues: true });
  }
  public static mapFromMulti<P>(data): StatisticDiagramResponseDto[] {
    return data.map(StatisticDiagramResponseDto.mapFrom);
  }
}
