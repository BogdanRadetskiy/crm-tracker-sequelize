import { models } from '@shared/configs';
import { InferSubjects } from '@casl/ability';

export function getModelByName(name: string): InferSubjects<any> {
  return models.find((el) => el?.toString()?.split(' ')?.[1]?.toLowerCase() === name);
}
