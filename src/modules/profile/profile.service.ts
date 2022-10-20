import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProfileRequestDto, ProfileUpdateDto } from '@modules/profile/dto';
import { Profile } from '@shared/models';
import { ProfileRepository } from '@shared/repositories';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async saveLastSessionDateTime(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException(`There isn't any profile with id: ${id}`);
    }
    return await this.profileRepository.updateLastSessionDateTime(id);
  }

  async create(createProfileDto: CreateProfileRequestDto, userId: string): Promise<Profile> {
    return this.profileRepository.create(createProfileDto.firstName, createProfileDto.lastName, userId);
  }

  async update(id: number, dto: ProfileUpdateDto, fileId?: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id);
    if (!profile) {
      throw new NotFoundException(`There isn't any profile with id: ${id}`);
    }
    return await this.profileRepository.update(id, dto, fileId);
  }

  async delete(id: number): Promise<void> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException(`There isn't any profile with id: ${id}`);
    }

    await this.profileRepository.delete(id);
  }
}
