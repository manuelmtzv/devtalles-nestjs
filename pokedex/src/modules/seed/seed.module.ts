import { Module } from '@nestjs/common';
import { SeedService } from './services/seed.service';
import { SeedController } from './controllers/seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Pokemon,
  PokemonSchema,
} from '@modules/pokemon/entities/pokemon.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
