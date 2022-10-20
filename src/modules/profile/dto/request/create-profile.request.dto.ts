import { PickType } from '@nestjs/swagger';
import { CreateUserRequestDto } from '@modules/user/dto';

export class CreateProfileRequestDto extends PickType(CreateUserRequestDto, [
  'firstName',
  'lastName',
  'phone',
] as const) {}
