import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  controllers: [ControllersController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
