import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PokeResponse } from '../types/poke-response.type';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '@/modules/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { HttpService } from '@/modules/http/services/http.service';

@Injectable()
export class SeedService {
  private readonly pokeapiUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {
    this.pokeapiUrl = this.config.getOrThrow('POKEAPI_BASE_URL');
  }

  async runSeed() {
    try {
      await this.pokemonModel.deleteMany();

      const { data } = await this.httpService.get<PokeResponse>(
        `${this.pokeapiUrl}/pokemon?limit=650`,
      );

      const pokemons = data.results.map(({ name, url }) => ({
        no: Number(url.match(/\/(\d+)\//).at(1)),
        name,
      }));

      return this.pokemonModel.insertMany(pokemons);
    } catch (err) {
      console.error('Error', err);
      throw new HttpException(
        'An error occurred while seeding the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
