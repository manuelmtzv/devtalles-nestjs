import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
