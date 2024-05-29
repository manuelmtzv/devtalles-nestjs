import { Request } from 'express';

type ProductFileFilter = {
  (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void;
};

export const productFileFilter: ProductFileFilter = (req, file, callback) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png'];

  if (validExtensions.includes(fileExtension)) return callback(null, true);

  callback(null, false);
};
