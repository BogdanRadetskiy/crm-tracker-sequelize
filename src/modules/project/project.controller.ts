import {
  Controller,
  Body,
  HttpStatus,
  Post,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { StrategiesEnum } from '@common/enums/strategies';
import { CreateProjectRequestDto, ProjectResponseDto, UpdateProjectRequestDto } from '@modules/project/dto';
import { ProjectService } from '@modules/project/project.service';
import { SingleFileInterceptor } from '@shared/interseptors';
import { RolesGuard } from '@shared/guards';
import { AuthUser, CheckAbilities } from '@shared/decorators';
import { MethodsEnum } from '@common/enums/methods';
import { Project, User } from '@shared/models';
import { UploadFileInterface } from '@common/interfaces/file';

@Controller('projects')
@ApiTags('Projects')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectsService: ProjectService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all project' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Project })
  @ApiOkResponse({ type: ProjectResponseDto, isArray: true })
  public async getAll(@AuthUser() user: User): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsService.getAll(user);
    return ProjectResponseDto.mapFromMulti(projects);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID project' })
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  @ApiOkResponse({ type: ProjectResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Project })
  public async findById(
    @AuthUser() user: User,
    @Param('id', ParseUUIDPipe) projectId: string,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectsService.findById(projectId, user);
    return ProjectResponseDto.mapFrom(project);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new project' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: Project })
  @UseInterceptors(SingleFileInterceptor('file', 'avatar'))
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body() data: CreateProjectRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ProjectResponseDto> {
    let fileData: UploadFileInterface;
    if (file) {
      fileData = {
        path: file.path,
        fileName: file.filename,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      };
    }
    const project: Project = await this.projectsService.create(data, fileData);
    return ProjectResponseDto.mapFrom(project);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update project' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: Project })
  @UseInterceptors(SingleFileInterceptor('file', 'avatar'))
  @ApiOkResponse({ type: ProjectResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body() projectData: UpdateProjectRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ProjectResponseDto> {
    let fileData: UploadFileInterface;
    if (file) {
      fileData = {
        path: file.path,
        fileName: file.filename,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      };
    }
    const project: Project = await this.projectsService.update(projectId, projectData, fileData);
    return ProjectResponseDto.mapFrom(project);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete project' })
  @ApiOkResponse({})
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: Project })
  @ApiNotFoundResponse({ description: `There isn't any project with id` })
  async delete(@Param('id', ParseUUIDPipe) projectId: string): Promise<void> {
    await this.projectsService.delete(projectId);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Search Project' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Project })
  @ApiOkResponse({ type: ProjectResponseDto, isArray: true })
  public async search(@Query('Project name') search: string): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsService.searchByName(search);
    return ProjectResponseDto.mapFromMulti(projects);
  }
}
