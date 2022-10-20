import { CallHandler, ExecutionContext, Inject, mixin, NestInterceptor, Optional, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer, diskStorage } from 'multer';
import * as dayjs from 'dayjs';

import { editFileName, imageFileFilter } from '@shared/utils';
import { fileConfig } from '@shared/configs/file.config';

type MulterInstance = any;

export function MultiFilesInterceptor(fieldName: string, maxCount?: number, destination?: string) {
  const date = dayjs().format('DD-MM-YYYY');

  return FastifyFilesInterceptor(fieldName, maxCount, {
    storage: diskStorage({
      destination: `${fileConfig.baseFileUrl}${destination}/${date}`,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  });
}

export function FastifyFilesInterceptor(
  fieldName: string,
  maxCount?: number,
  localOptions?: Options,
): Type<NestInterceptor> {
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
      const context_ = context.switchToHttp();

      await new Promise<void>((resolve, reject) =>
        this.multer.array(fieldName, maxCount)(context_.getRequest(), context_.getResponse(), (error: any) => {
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
