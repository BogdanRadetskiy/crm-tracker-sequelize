import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@modules/auth/auth.service';
import { SignInRequestDto } from '@modules/auth/dto';
import { UserResponseDto } from '@modules/user/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(signInDto: SignInRequestDto): Promise<UserResponseDto> {
    return this.authService.login(signInDto);
  }
}
