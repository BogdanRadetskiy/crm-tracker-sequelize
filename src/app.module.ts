import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@modules/health/health.controller';

import { UserModule } from '@modules/user/user.module';
import { ProjectModule } from '@modules/project/project.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ClientModule } from '@modules/client/client.module';
import { LoggedDayModule } from '@modules/loggedDay/logged-day.module';
import { LoggerModule } from 'nestjs-pino';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from '@modules/file/file.module';
import { AccessModule } from '@modules/access/access.module';
import { models, postgresConfig } from '@shared/configs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { StatisticModule } from '@modules/statistic/statistic.module';
import { JobModule } from '@modules/job/job.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
        serializers: {
          req: (request) => ({
            id: request.id,
            method: request.method,
            url: request.url,
          }),
          res: (response) => ({
            statusCode: response.statusCode,
            message: response.message,
          }),
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    SequelizeModule.forRoot({
      ...postgresConfig,
      models,
      logging: false,
    }),
    UserModule,
    TerminusModule,
    ProjectModule,
    AuthModule,
    ClientModule,
    LoggedDayModule,
    FileModule,
    AccessModule,
    StatisticModule,
    JobModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
