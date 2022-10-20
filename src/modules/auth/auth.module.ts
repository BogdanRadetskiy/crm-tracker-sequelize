import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from '@modules/user/user.module';

import { JwtStrategy } from '@shared/strategies/jwt.strategy';
import { LocalStrategy } from '@shared/strategies/local.strategy';
import { appConfig } from '@shared/configs';
import { AzureADStrategy } from '@shared/strategies/azure.strategy';

import { ProviderService } from '@modules/provider/provider.service';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { User, UserProvider } from '@shared/models';
import { ProviderRepository } from '@shared/repositories';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([User, UserProvider]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: appConfig.getAppSecret(),
      signOptions: {
        expiresIn: appConfig.getJwtExpired(),
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    ProviderService,
    ProviderRepository,
    LocalStrategy,
    JwtStrategy,
    AzureADStrategy,
  ],
})
export class AuthModule {}
