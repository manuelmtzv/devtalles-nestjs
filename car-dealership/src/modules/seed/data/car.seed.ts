import { v4 as uuid } from 'uuid';
import { Car } from '@/modules/cars/entities/car.entity';

export const CAR_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Cherokee',
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Wrangler',
  },
];
