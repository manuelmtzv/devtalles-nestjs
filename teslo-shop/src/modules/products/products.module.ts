import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '@/modules/tags/entities/tag.entity';
import { TagsModule } from '@/modules/tags/tags.module';
import { Product, Image } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tag, Image]), TagsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
