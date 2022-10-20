import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { appConfig } from '@shared/configs/app.config';

import { AuthService } from '@modules/auth/auth.service';
import { JwtPayload } from '@common/interfaces/jwt/jwt-payload.interface';
import { User } from '@shared/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.getAppSecret(),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.verifyPayload(payload);
  }
}
