import {
  Controller,
  Body,
  HttpStatus,
  Post,
  HttpCode,
  UseGuards,
  Get,
  ParseUUIDPipe,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StrategiesEnum } from '@common/enums/strategies';
import { AuthUser, CheckAbilities } from '@shared/decorators';
import { LoggedDayService } from './logged-day.service';

import {
  CreateLoggedDayRequestDto,
  CreateLoggedDayResponseDto,
  UpdateLoggedDayRequestDto,
  GetLoggedDaysFilterRequestDto,
} from './dto';
import { LoggedDay, User } from '@shared/models';
import { RolesGuard } from '@shared/guards';
import { MethodsEnum } from '@common/enums/methods';

@Controller('loggedDays')
@ApiTags('loggedDays')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class LoggedDayController {
  constructor(private readonly loggedDaysService: LoggedDayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new logged day' })
  @ApiOkResponse({ type: CreateLoggedDayResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: LoggedDay })
  @UseGuards(AuthGuard(StrategiesEnum.AZURE))
  async create(@Body() data: CreateLoggedDayRequestDto, @AuthUser() user: User): Promise<CreateLoggedDayResponseDto> {
    const loggedDay = await this.loggedDaysService.create(data, user);
    return CreateLoggedDayResponseDto.mapFrom(loggedDay);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID logged day' })
  @ApiOkResponse({ type: CreateLoggedDayResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: LoggedDay })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findById(
    @AuthUser() user: User,
    @Param('id', ParseUUIDPipe) loggedDayId: string,
  ): Promise<CreateLoggedDayResponseDto> {
    const loggedDay = await this.loggedDaysService.findById(loggedDayId, user);
    return CreateLoggedDayResponseDto.mapFrom(loggedDay);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update logged day' })
  @ApiOkResponse({ type: UpdateLoggedDayRequestDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: LoggedDay })
  @ApiNotFoundResponse({ description: `There isn't any logged day with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @AuthUser() user: User,
    @Param('id', ParseUUIDPipe) loggedDayId: string,
    @Body() loggedDayData: UpdateLoggedDayRequestDto,
  ): Promise<void> {
    await this.loggedDaysService.update(loggedDayId, loggedDayData, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find logged days' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: LoggedDay })
  @ApiOkResponse({ type: GetLoggedDaysFilterRequestDto, isArray: true })
  async find(
    @AuthUser() user: User,
    @Query() filterDto: GetLoggedDaysFilterRequestDto,
  ): Promise<CreateLoggedDayResponseDto[]> {
    const loggedDays = await this.loggedDaysService.getAll(filterDto, user);
    return CreateLoggedDayResponseDto.mapFromMulti(loggedDays);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete logged day' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({})
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: LoggedDay })
  @ApiNotFoundResponse({ description: `There isn't any logged day with this id` })
  async delete(@Param('id', ParseUUIDPipe) loggedDayId: string) {
    await this.loggedDaysService.delete(loggedDayId);
  }
}
