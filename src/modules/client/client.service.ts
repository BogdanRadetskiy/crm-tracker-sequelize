import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { UploadFileInterface } from '@common/interfaces/file/upload-file.interface';
import { CreateClientRequestDto, UpdateClientRequestDto } from '@modules/client/dto';
import { FileService } from '@modules/file/file.service';
import { Client, File } from '@shared/models';
import { ClientRepository } from '@shared/repositories';
import { ClientData } from '@common/types/client';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly fileService: FileService,
    @InjectPinoLogger(ClientService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async findById(id: string): Promise<Client> {
    return await this.clientRepository.findOne(id);
  }

  async searchByName(name: string): Promise<Client[]> {
    return await this.clientRepository.searchByName(name);
  }

  async create(data: CreateClientRequestDto, fileData?: UploadFileInterface): Promise<Client> {
    let avatarId: string | null;
    if (fileData) {
      const file: File = await this.fileService.save(fileData);
      avatarId = file.id;
    }
    return await this.clientRepository.create(data.name, data.website, avatarId);
  }

  async update(id: string, dto: UpdateClientRequestDto, fileData?: UploadFileInterface): Promise<Client> {
    try {
      const client: Client = await this.clientRepository.findOne(id);

      if (!client) {
        throw new NotFoundException(`There isn't any client with id: ${id}`);
      }
      const clientData: ClientData = {
        name: dto.name,
        website: dto.website,
      };
      if (fileData) {
        const file = await this.fileService.save(fileData);
        await this.fileService.delete(client.file);
        clientData.avatarId = file.id;
      }
      return await this.clientRepository.update(id, clientData);
    } catch (error) {
      this.logger.error({ error, id, dto }, 'ClientService:update');
      throw new InternalServerErrorException(
        error instanceof NotFoundException ? error.message : 'Error update client',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const client: Client = await this.clientRepository.findOneWithFile(id);

      if (!client) {
        throw new NotFoundException(`There isn't any client with id: ${id}`);
      }
      await this.clientRepository.delete(id);
      await this.fileService.delete(client.file);
    } catch (error) {
      this.logger.error({ error, id }, 'ClientService:delete');
      throw new InternalServerErrorException(error instanceof NotFoundException ? error.message : 'Error save client');
    }
  }
}
