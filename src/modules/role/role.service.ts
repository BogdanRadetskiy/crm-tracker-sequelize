import { Injectable } from '@nestjs/common';

import { Role } from '@shared/models';
import { RoleRepository } from '@shared/repositories';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async getUserRole(): Promise<Role> {
    return await this.roleRepository.findOneUser();
  }

  async getAdminRole(): Promise<Role> {
    return await this.roleRepository.findOneAdmin();
  }
}
