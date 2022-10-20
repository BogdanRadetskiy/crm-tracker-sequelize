import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { Client } from '@shared/models';

export class ClientResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  website: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.file?.path || null)
  @Expose()
  avatarPath: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  public static mapFrom(data: Client): ClientResponseDto {
    const client = plainToClass(ClientResponseDto, data, { excludeExtraneousValues: true });

    return { ...client };
  }

  public static mapFromMulti<P>(data: Client[]): ClientResponseDto[] {
    return data.map(ClientResponseDto.mapFrom);
  }
}
