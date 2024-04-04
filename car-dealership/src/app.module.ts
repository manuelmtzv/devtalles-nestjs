import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { BrandsModule } from './modules/brands/brands.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [CarsModule, BrandsModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
