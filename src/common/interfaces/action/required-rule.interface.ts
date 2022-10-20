import { Subjects } from '@modules/ability/ability.factory';
import { MethodsEnum } from '@common/enums/methods';

export interface RequiredRule {
  action: MethodsEnum;
  subject: Subjects;
}
