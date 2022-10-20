import { Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StrategiesEnum } from '@common/enums/strategies';
import { AccessService } from '@modules/access/access.service';
import { AccessResponseDto } from '@modules/access/dto';
import { RolesGuard } from '@shared/guards';
import { MethodsEnum } from '@common/enums/methods';
import { CheckAbilities } from '@shared/decorators';
import { Access } from '@shared/models';

@Controller('access')
@ApiTags('Access')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Access })
  @ApiOperation({ description: 'Get all accesses' })
  public async getAll(): Promise<AccessResponseDto[]> {
    const accesses = await this.accessService.getAllAccesses();
    return AccessResponseDto.mapFromMulti(accesses);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: Access })
  @ApiOperation({ description: 'Update user to admin' })
  public async updateUser(@Param('id', ParseUUIDPipe) userId: string): Promise<void> {
    await this.accessService.updateUserToAdmin(userId);
  }
}
