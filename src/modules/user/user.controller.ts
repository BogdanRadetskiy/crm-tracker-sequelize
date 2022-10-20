import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { StrategiesEnum } from '@common/enums/strategies';
import { AuthUser, CheckAbilities } from '@shared/decorators';
import { CreateUserRequestDto, UserResponseDto, UpdateUserRequestDto, DeleteByIdsRequestDto } from './dto';
import { UserService } from './user.service';
import { SingleFileInterceptor } from '@shared/interseptors';
import { User } from '@shared/models';
import { RolesGuard } from '@shared/guards';
import { MethodsEnum } from '@common/enums/methods';
import { UploadFileInterface } from '@common/interfaces/file';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class UserController {
  constructor(private usersService: UserService) {}
  @Get('me')
  @ApiOperation({ description: 'Get profile user' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: User })
  @ApiOkResponse({ type: UserResponseDto })
  async getMyProfile(@AuthUser() user: User): Promise<UserResponseDto> {
    const me = await this.usersService.findByIdWithProfile(user.id);
    return UserResponseDto.mapFrom(me);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new user' })
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: User })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() data: CreateUserRequestDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(data);
    return UserResponseDto.mapFrom(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update user' })
  @UseInterceptors(SingleFileInterceptor('file', 'avatar'))
  @ApiConsumes('multipart/form-data')
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: User })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any user with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() userData: UpdateUserRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<UserResponseDto> {
    let fileData: UploadFileInterface;
    if (file) {
      fileData = {
        path: file.path,
        fileName: file.filename,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      };
    }
    const user: User = await this.usersService.update(userId, userData, fileData);
    return UserResponseDto.mapFrom(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID user' })
  @ApiOkResponse({ type: UserResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: User })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(@Param('id', ParseUUIDPipe) userId: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);
    return UserResponseDto.mapFrom(user);
  }

  @Get()
  @ApiOperation({ description: 'Get all user' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: User })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  public async getAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAll();
    return UserResponseDto.mapFromMulti(users);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete user' })
  @ApiOkResponse({})
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: User })
  @ApiNotFoundResponse({ description: `There isn't any user with id` })
  async delete(@Param('id', ParseUUIDPipe) userId: string): Promise<void> {
    await this.usersService.delete(userId);
  }

  @Delete('byIds')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: User })
  @ApiOperation({ description: 'Delete users' })
  @ApiOkResponse({ description: 'Undeleted ids', type: [String], isArray: true })
  @ApiNotFoundResponse({ description: `There isn't any user with id` })
  async deleteByIds(@Body() ids: DeleteByIdsRequestDto): Promise<object[]> {
    return await this.usersService.deleteByIds(ids);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: User })
  @ApiOperation({ description: 'Search users' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  public async search(@Query('name (first or last)') search: string): Promise<UserResponseDto[]> {
    const users = await this.usersService.searchByName(search);
    return UserResponseDto.mapFromMulti(users);
  }

  @Post('save-last-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: User })
  @ApiOperation({ description: 'Update session date and time' })
  @ApiOkResponse({})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async saveLastSessionDateTime(@AuthUser() user: User): Promise<void> {
    await this.usersService.saveLastSessionDateTime(user);
  }
}
