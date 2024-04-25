import { Injectable } from '@nestjs/common';
import { Image } from '@/modules/images/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll() {
    return await this.imageRepository.find();
  }
}
