import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const arrayInMultipartRequestHelper = (array: any): any[] => {
  if (!array) {
    return [];
  }

  if (Array.isArray(array)) {
    return array;
  }

  if (typeof array === 'object') {
    return array;
  }

  if (typeof array === 'string' && array.includes('[')) {
    return JSON.parse(array);
  }

  if (typeof array === 'string' && array.includes('{')) {
    return JSON.parse(`[${array}]`);
  }

  if (typeof array === 'string') {
    return array.split(',');
  }
};

@ValidatorConstraint()
export class ArrayStringInDtoValidation implements ValidatorConstraintInterface {
  async validate(value: string) {
    if (typeof value !== 'string') {
      throw new BadRequestException('values in array must be a string');
    }
    return true;
  }
}
