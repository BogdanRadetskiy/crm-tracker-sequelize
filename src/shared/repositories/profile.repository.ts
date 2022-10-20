import { InjectModel } from '@nestjs/sequelize';

import { ProfileUpdateDto } from '@modules/profile/dto';
import { Profile } from '@shared/models';
import { mappingUpdateResponse } from '@shared/helpers';

export class ProfileRepository {
  constructor(
    @InjectModel(Profile)
    private readonly profile: typeof Profile,
  ) {}

  async findOne(id: number): Promise<Profile> {
    return await this.profile.findOne({
      where: { id },
    });
  }

  async create(firstName: string, lastName: string, userId: string): Promise<Profile> {
    return this.profile.create({
      firstName,
      lastName,
      userId,
    });
  }

  async updateLastSessionDateTime(id: number): Promise<Profile> {
    const updatedData = await this.profile.update(
      {
        lastSessionDateTime: new Date(),
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse(updatedData);
  }

  async update(id: number, data: ProfileUpdateDto, avatarId: string | null): Promise<Profile> {
    const updatedData = await this.profile.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        skills: data.skills,
        avatarId,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse(updatedData);
  }

  async delete(id: number): Promise<void> {
    await this.profile.destroy({
      where: { id },
    });
  }
}
