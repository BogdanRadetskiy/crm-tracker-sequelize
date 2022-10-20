import { Injectable } from '@nestjs/common';
import { AccessRepository } from '@shared/repositories';
import { UserService } from '@modules/user/user.service';
import { Access } from '@shared/models';
import { UserRoleEnum } from '@common/enums/users';

@Injectable()
export class AccessService {
  constructor(private readonly accessRepository: AccessRepository, private readonly userService: UserService) {}

  async getAllAccesses(): Promise<Access[]> {
    return await this.accessRepository.getAllAccesses();
  }

  async getAccesses(role: UserRoleEnum): Promise<Access[]> {
    return await this.accessRepository.getAccesses(role);
  }

  async updateUserToAdmin(userId: string): Promise<void> {
    await this.userService.updateUser(userId);
  }
}
