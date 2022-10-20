import { Request } from 'express';
import { extname } from 'node:path';
import { InternalServerErrorException } from '@nestjs/common';

export const editFileName = (request: Request, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtensionName = extname(file.originalname);
  const randomName = Array.from({ length: 4 })
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtensionName}`);
};

export const imageFileFilter = (request: Request, file: Express.Multer.File, callback) => {
  if (!/\.(jpg|jpeg|png|gif)$/.test(file.originalname)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const excelFileFilter = (request: Request, file: Express.Multer.File, callback) => {
  if (!/\.(xls|xlsx)$/.test(file.originalname)) {
    return callback(new InternalServerErrorException('Only excel files are allowed!'), false);
  }
  callback(null, true);
};
