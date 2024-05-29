import { Module } from '@nestjs/common';
import { SeedController } from '@/modules/seed/seed.controller';
import { SeedService } from '@/modules/seed/seed.service';
import { ProductsModule } from '@/modules/products/products.module';
import { TagsModule } from '@/modules/tags/tags.module';

@Module({
  imports: [ProductsModule, TagsModule],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
