import { SetMetadata } from '@nestjs/common';
import { RequiredRule } from '@common/interfaces/action';

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);
