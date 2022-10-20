import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { CHECK_ABILITY } from '@shared/decorators';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly caslAbilityFactory: AbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let rules = this.reflector.get(CHECK_ABILITY, context.getHandler()) || [];
    if (!Array.isArray(rules)) {
      rules = [rules];
    }

    const { user } = context.switchToHttp().getRequest();
    const ability = await this.caslAbilityFactory.defineAbility(user.role);

    for (const rule of rules) {
      ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
    }
    return true;
  }
}
