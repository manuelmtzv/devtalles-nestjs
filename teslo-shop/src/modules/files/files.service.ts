import { requestHostUrl } from '@/shared/utils/requestHostUrl';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private readonly config: ConfigService) {}

  findProductImage(name: string) {
    const path = join(__dirname, `../../../static/products/${name}`);

    if (!existsSync(path)) {
      throw new NotFoundException(`File not found: ${name}`);
    }

    return path;
  }

  async uploadFile(file: Express.Multer.File, req: Request) {
    const secureUrl =
      requestHostUrl(req, {
        prefix: `${this.config.getOrThrow('API_PREFIX')}/files/product/`,
      }) + file.filename;

    return {
      secureUrl,
    };
  }
}
