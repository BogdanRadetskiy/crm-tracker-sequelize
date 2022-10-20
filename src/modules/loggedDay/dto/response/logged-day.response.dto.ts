import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';

import { ProjectResponseDto } from '@modules/project/dto';
import { UserResponseDto } from '@modules/user/dto';
import { LoggedDay } from '@shared/models';
import { DepartmentResponseDto } from '@modules/department/dto';

export class CreateLoggedDayResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  hours: number;

  @ApiProperty()
  @Expose()
  minutes: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  date: string;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => DepartmentResponseDto)
  department: DepartmentResponseDto;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.job?.name || null)
  job: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;

  public static mapFrom(data: LoggedDay): CreateLoggedDayResponseDto {
    return plainToClass(CreateLoggedDayResponseDto, data, { excludeExtraneousValues: true });
  }

  public static mapFromMulti<P>(data: LoggedDay[]): CreateLoggedDayResponseDto[] {
    return data.map(CreateLoggedDayResponseDto.mapFrom);
  }
}
