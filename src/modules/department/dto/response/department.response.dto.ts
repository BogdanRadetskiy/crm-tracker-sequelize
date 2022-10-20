import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Department } from '@shared/models';

export class DepartmentResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  public static mapFrom(data: Department): DepartmentResponseDto {
    const department = plainToClass(DepartmentResponseDto, data, { excludeExtraneousValues: true });

    return { ...department };
  }

  public static mapFromMulti<P>(data: Department[]): DepartmentResponseDto[] {
    return data.map(DepartmentResponseDto.mapFrom);
  }
}
