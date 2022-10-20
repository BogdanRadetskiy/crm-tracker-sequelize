import { TimeType } from '@common/types';

const firstIndex = 1;
const secondIndex = 0;

export function mappingUpdateResponse<T>(array: [number, T[]]): T {
  return array[firstIndex][secondIndex];
}

export function mappingTimeResponse(array: object[]): TimeType {
  return array[secondIndex] as TimeType;
}
