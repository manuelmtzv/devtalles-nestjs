import { v4 as uuidv4 } from 'uuid';
import { Brand } from '@/modules/brands/entities/brand.entity';

export const BRAND_SEED: Brand[] = [
  {
    id: uuidv4(),
    name: 'Toyota',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Jeep',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
