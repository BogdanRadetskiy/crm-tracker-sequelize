import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthCookieEnums } from '@common/enums/cookies';
import { AuthService } from '@modules/auth/auth.service';
import { User } from '@shared/models';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const httpArgumentHost = context.switchToHttp();
    const response = httpArgumentHost.getResponse<Response>();

    return next.handle().pipe(
      map(async ({ user }: { user: User }) => {
        const accessToken = await this.authService.getJwtToken(user);
        const refreshToken = await this.authService.getRefreshToken(user.id);

        response.cookie(AuthCookieEnums.Access, accessToken, {
          httpOnly: true,
          domain: this.config.get('app.cookieDomain'),
        });

        response.cookie(AuthCookieEnums.Refresh, refreshToken, {
          httpOnly: true,
          domain: this.config.get('app.cookieDomain'),
        });
        return { token: accessToken, user };
      }),
    );
  }
}
