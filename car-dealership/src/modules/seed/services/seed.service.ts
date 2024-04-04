import { Injectable } from '@nestjs/common';
import { CarsService } from '@modules/cars/services/cars.service';
import { BrandsService } from '@/modules/brands/services/brands.service';

import { CAR_SEED, BRAND_SEED } from '@modules/seed/data';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  seedDB() {
    this.brandsService.seedBrands(BRAND_SEED);
    this.carsService.seedCars(CAR_SEED);
  }
}
