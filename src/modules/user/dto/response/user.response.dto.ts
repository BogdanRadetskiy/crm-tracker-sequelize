import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';

import { DepartmentResponseDto } from '@modules/department/dto';
import { User } from '@shared/models';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.firstName)
  @Expose()
  firstName: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.lastName)
  @Expose()
  lastName: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.role?.type)
  @Expose()
  role: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.skills)
  @Expose()
  skills: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.lastSessionDateTime)
  @Expose()
  lastSessionDateTime: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.file?.path || null)
  @Expose()
  avatarPath: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.profile.phone)
  @Expose()
  phone: string;

  @ApiProperty({ type: DepartmentResponseDto })
  @Expose()
  @Type(() => DepartmentResponseDto)
  department: DepartmentResponseDto;

  public static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, { excludeExtraneousValues: true });
  }

  public static mapFromMulti<P>(data: User[]): UserResponseDto[] {
    return data.map(UserResponseDto.mapFrom);
  }
}
