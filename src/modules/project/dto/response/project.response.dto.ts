import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform, Type } from 'class-transformer';

import { UserResponseDto } from '@modules/user/dto';
import { ClientResponseDto } from '@modules/client/dto';
import { Project } from '@shared/models';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.file?.path || null)
  @Expose()
  imagePath: string;

  @ApiProperty({ type: ClientResponseDto })
  @Expose()
  @Type(() => ClientResponseDto)
  client: ClientResponseDto;

  @ApiProperty({ type: UserResponseDto, isArray: true })
  @Expose()
  @Type(() => UserResponseDto)
  users: UserResponseDto[];

  public static mapFrom(data: Project): ProjectResponseDto {
    const client = ClientResponseDto.mapFrom(data.client);
    const users = UserResponseDto.mapFromMulti(data.users);
    const project = plainToClass(ProjectResponseDto, data, { excludeExtraneousValues: true });

    return { ...project, client, users };
  }

  public static mapFromMulti<P>(data: Project[]): ProjectResponseDto[] {
    return data.map(ProjectResponseDto.mapFrom);
  }
}
