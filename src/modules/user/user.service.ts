import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserRequestDto } from '@modules/user/dto';

import { FileService } from '@modules/file/file.service';
import { UserSignUpInterface } from '@common/interfaces/user';
import { RoleService } from '@modules/role/role.service';
import { ProfileService } from '@modules/profile/profile.service';
import { DepartmentService } from '@modules/department/department.service';
import { UploadFileInterface } from '@common/interfaces/file';
import { DeleteByIdsRequestDto } from '@modules/user/dto/request';
import { File, User } from '@shared/models';
import { UserRepository } from '@shared/repositories';
import { DEFAULT_COUNT } from '@common/constants';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
    private readonly fileService: FileService,
    private readonly departmentService: DepartmentService,
    private readonly roleService: RoleService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAllWithFileAndDepartment();
  }

  async getCount(userId: string, projectId: string): Promise<number> {
    if (userId) {
      return DEFAULT_COUNT;
    }
    if (projectId) {
      return await this.userRepository.getCountByProjectId(projectId);
    }
    return await this.userRepository.getAllCount();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneWithFileAndDepartment(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneEmail(email);

    return user || null;
  }

  async findByIdWithProfile(id: string): Promise<User> {
    const user = await this.userRepository.findOneWithProfileAndDepartment(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    return user;
  }

  async searchByName(name: string): Promise<User[]> {
    return await this.userRepository.searchByName(name);
  }

  async findFromArray(array: string[]): Promise<User[]> {
    return await this.userRepository.findAllWithProfile(array);
  }

  async saveLastSessionDateTime(currentUser: User): Promise<void> {
    await this.profileService.saveLastSessionDateTime(currentUser.profile.id);
  }

  async create(data: UserSignUpInterface): Promise<User> {
    const userEmailCheck = await this.findByEmail(data.email);
    if (userEmailCheck) {
      throw new ConflictException(`Error create new user`);
    }
    // by default all user granted USER
    const role = await this.roleService.getUserRole();
    const createdUser = await this.userRepository.create(data, role.id);
    createdUser.profile = await this.profileService.create({ ...data }, createdUser.id);
    return createdUser;
  }

  async updateUser(id: string): Promise<void> {
    await this.userRepository.updateUser(id);
  }

  async update(id: string, dto: UpdateUserRequestDto, fileData?: UploadFileInterface): Promise<User> {
    const user: User = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }

    let avatarId: string | null;
    let file: File;
    if (fileData) {
      file = await this.fileService.save(fileData);
      avatarId = file.id;
    }

    const department = await this.departmentService.getById(dto.departmentId);
    const updatedProfile = await this.profileService.update(user.profile.id, dto, avatarId);
    const updatedUser = await this.userRepository.update(id, dto, department.id);
    updatedUser.profile = updatedProfile;
    user.department = department;
    user.profile.file = file;
    return updatedUser;
  }

  async delete(id: string): Promise<string | void> {
    const user = await this.userRepository.findOneWithFile(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    await this.userRepository.delete(user.id);
    await this.fileService.delete(user.profile.file);
  }

  async deleteByIds(usersWithIds: DeleteByIdsRequestDto): Promise<object[]> {
    const undeletedIds: object[] = [];

    const users = usersWithIds.ids.map(async (id) => {
      await this.delete(id).catch(() => {
        undeletedIds.push({
          id,
          status: false,
        });
      });
    });

    await Promise.allSettled(users);

    return undeletedIds;
  }
}
