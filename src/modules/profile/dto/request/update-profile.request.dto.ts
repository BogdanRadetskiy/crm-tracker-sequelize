import { PickType } from '@nestjs/swagger';
import { UpdateUserRequestDto } from '@modules/user/dto';

export class ProfileUpdateDto extends PickType(UpdateUserRequestDto, [
  'firstName',
  'lastName',
  'skills',
  'phone',
  'file',
] as const) {}
