import { PipeTransform, Injectable } from '@nestjs/common';
import { composeSlug } from '@/shared/utils/composeSlug';

@Injectable()
export class SlugPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return composeSlug(value);
    }

    return value;
  }
}
