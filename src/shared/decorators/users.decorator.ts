import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { User } from '@shared/models';

interface UserDec extends User {
  dataValues: any;
}

export const AuthUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest<Request>().user as UserDec;
  delete user.password;
  delete user.refreshToken;

  return user.dataValues;
});
