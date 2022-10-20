import {
  Controller,
  Body,
  HttpStatus,
  Post,
  Get,
  Put,
  Param,
  HttpCode,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { StrategiesEnum } from '@common/enums/strategies';
import { CreateClientRequestDto, ClientResponseDto, UpdateClientRequestDto } from '@modules/client/dto';
import { ClientService } from '@modules/client/client.service';
import { SingleFileInterceptor } from '@shared/interseptors';
import { RolesGuard } from '@shared/guards';
import { CheckAbilities } from '@shared/decorators';
import { MethodsEnum } from '@common/enums/methods';
import { Client } from '@shared/models';
import { UploadFileInterface } from '@common/interfaces/file';

@Controller('clients')
@ApiTags('Clients')
@UseGuards(AuthGuard(StrategiesEnum.AZURE))
@ApiBearerAuth()
export class ClientController {
  constructor(private clientsService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create new client' })
  @UseInterceptors(SingleFileInterceptor('file', 'avatar'))
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Create, subject: Client })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ClientResponseDto })
  @ApiBadRequestResponse({ description: 'Incorrect data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body() data: CreateClientRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ClientResponseDto> {
    let fileData: UploadFileInterface;
    if (file) {
      fileData = {
        path: file.path,
        fileName: file.filename,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      };
    }
    const client: Client = await this.clientsService.create(data, fileData);
    return ClientResponseDto.mapFrom(client);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all clients' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Client })
  @ApiOkResponse({ type: ClientResponseDto, isArray: true })
  public async getAll(): Promise<ClientResponseDto[]> {
    const clients = await this.clientsService.getAll();
    return ClientResponseDto.mapFromMulti(clients);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update client' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(SingleFileInterceptor('file', 'avatar'))
  @ApiOkResponse({ type: ClientResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Update, subject: Client })
  @ApiNotFoundResponse({ description: `There isn't any client with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) clientId: string,
    @Body() clientData: UpdateClientRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ClientResponseDto> {
    let fileData: UploadFileInterface;
    if (file) {
      fileData = {
        path: file.path,
        fileName: file.filename,
        originalFileName: file.originalname,
        mimeType: file.mimetype,
      };
    }
    const client: Client = await this.clientsService.update(clientId, clientData, fileData);
    return ClientResponseDto.mapFrom(client);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID client' })
  @ApiOkResponse({ type: ClientResponseDto })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Client })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(@Param('id', ParseUUIDPipe) clientId: string): Promise<ClientResponseDto> {
    const client = await this.clientsService.findById(clientId);
    return ClientResponseDto.mapFrom(client);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete client' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({})
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Delete, subject: Client })
  @ApiNotFoundResponse({ description: `There isn't any client with id` })
  async delete(@Param('id', ParseUUIDPipe) clientId: string): Promise<void> {
    await this.clientsService.delete(clientId);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Search Client' })
  @UseGuards(RolesGuard)
  @CheckAbilities({ action: MethodsEnum.Read, subject: Client })
  @ApiOkResponse({ type: ClientResponseDto, isArray: true })
  public async search(@Query('search') search: string): Promise<ClientResponseDto[]> {
    const clients = await this.clientsService.searchByName(search);
    return ClientResponseDto.mapFromMulti(clients);
  }
}
