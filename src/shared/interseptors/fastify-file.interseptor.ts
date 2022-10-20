import { CallHandler, ExecutionContext, Inject, mixin, NestInterceptor, Optional, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer, diskStorage } from 'multer';
import * as dayjs from 'dayjs';

import { editFileName, imageFileFilter } from '@shared/utils';
import { fileConfig } from '@shared/configs/file.config';

export function SingleFileInterceptor(fieldName: string, destination?: string) {
  const date = dayjs().format('DD-MM-YYYY');

  return FastifyFileInterceptor(fieldName, {
    storage: diskStorage({
      destination: `${fileConfig.baseFileUrl}${destination}/${date}`,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  });
}

type MulterInstance = any;
export function FastifyFileInterceptor(fieldName: string, localOptions: Options): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(
      @Optional()
      @Inject('MULTER_MODULE_OPTIONS')
      options: Multer,
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (error: any) => {
          if (error) {
            return reject(error);
          }
          resolve();
        }),
      );

      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
