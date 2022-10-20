import {
  Controller,
  Body,
  HttpStatus,
  Post,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { DepartmentResponseDto, CreateDepartmentRequestDto } from './dto';
import { DepartmentService } from './department.service';
import { AuthGuard } from '@nestjs/passport';
import { StrategiesEnum } from '@common/enums/strategies';
import { RolesGuard } from '@shared/guards';
import { CheckAbilities } from '@shared/decorators';
import { MethodsEnum } from '@common/enums/methods';
import { Department } from '@shared/models';

@Controller('departments')
@ApiTags('Departments')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class DepartmentController {
  constructor(private readonly departmentsService: DepartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new department' })
  @ApiOkResponse({ type: DepartmentResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: Department })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: CreateDepartmentRequestDto): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.create(data);
    return DepartmentResponseDto.mapFrom(department);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all department' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Department })
  @ApiOkResponse({ type: DepartmentResponseDto, isArray: true })
  public async getAll(): Promise<DepartmentResponseDto[]> {
    const departments = await this.departmentsService.getAll();
    return DepartmentResponseDto.mapFromMulti(departments);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID department' })
  @ApiOkResponse({ type: DepartmentResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Department })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async getById(@Param('id', ParseUUIDPipe) departmentId: string): Promise<DepartmentResponseDto> {
    const department = await this.departmentsService.getById(departmentId);
    return DepartmentResponseDto.mapFrom(department);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete department' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: Department })
  async delete(@Param('id', ParseUUIDPipe) departmentId: string): Promise<void> {
    await this.departmentsService.delete(departmentId);
  }
}
