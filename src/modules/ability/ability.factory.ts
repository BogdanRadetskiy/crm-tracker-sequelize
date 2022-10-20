import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Access, Client, Department, LoggedDay, Project, Role, User } from '@shared/models';
import { MethodsEnum } from '@common/enums/methods';
import { AccessService } from '@modules/access/access.service';
import { getModelByName } from '@shared/helpers/access.helper';
import { RoleService } from '@modules/role/role.service';

export type Subjects =
  | InferSubjects<typeof User | typeof Project | typeof Client | typeof LoggedDay | typeof Department | typeof Access>
  | 'all';

export type AppAbility = Ability<[MethodsEnum, Subjects]>;

@Injectable()
export class AbilityFactory {
  constructor(private readonly accessService: AccessService, private readonly roleService: RoleService) {}
  async defineAbility(usersRole: Role): Promise<AppAbility> {
    const roles = await this.roleService.getAllRoles();
    const { can, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);

    const role = roles.find((value) => value.type === usersRole.type);
    if (role) {
      const accesses = await this.accessService.getAccesses(role.type);
      for (const access of accesses) {
        can(access.method, getModelByName(access.module.toLowerCase()));
      }
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
