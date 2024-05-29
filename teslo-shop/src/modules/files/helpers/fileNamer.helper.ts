import { v4 as uuid } from 'uuid';

export function fileNamer(
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, fileName: string) => void,
) {
  const fileExtension = file.mimetype.split('/').at(-1);

  const uniqueIdentifier = uuid();

  const fileName = `${uniqueIdentifier}.${fileExtension}`;

  cb(null, fileName);
}
