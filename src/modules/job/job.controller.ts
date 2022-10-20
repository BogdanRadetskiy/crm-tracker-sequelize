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
import { CheckAbilities } from '@shared/decorators';

import { JobResponseDto, JobRequestDto } from './dto';
import { Project } from '@shared/models';
import { RolesGuard } from '@shared/guards';
import { MethodsEnum } from '@common/enums/methods';
import { JobService } from '@modules/job/job.service';

@Controller('jobs')
@ApiTags('Jobs')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find all jobs' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Project })
  @ApiOkResponse({ type: JobResponseDto, isArray: true })
  async find(): Promise<JobResponseDto[]> {
    const jobs = await this.jobService.getAll();
    return JobResponseDto.mapFromMulti(jobs);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new job' })
  @ApiOkResponse({ type: JobResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: Project })
  @UseGuards(AuthGuard(StrategiesEnum.AZURE))
  async create(@Body() data: JobRequestDto): Promise<JobResponseDto> {
    const job = await this.jobService.create(data);
    return JobResponseDto.mapFrom(job);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update job' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: Project })
  @ApiNotFoundResponse({ description: `There isn't any job with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id', ParseUUIDPipe) jobId: string, @Body() jobData: JobRequestDto): Promise<void> {
    await this.jobService.update(jobData, jobId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete logged day' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({})
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: Project })
  @ApiNotFoundResponse({ description: `There isn't any logged day with this id` })
  async delete(@Param('id', ParseUUIDPipe) jobId: string): Promise<void> {
    await this.jobService.delete(jobId);
  }
}
