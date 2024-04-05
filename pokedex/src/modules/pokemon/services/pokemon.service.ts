import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from '@modules/pokemon/dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from '@modules/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { handleMongoErrorsCallback } from '@/common/utils/handleMongoErrorsCallback';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with identifier '${term}' not found`,
      );

    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    return await handleMongoErrorsCallback(async () => {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    });
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    return await handleMongoErrorsCallback(async () => {
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    });
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletedCount)
      throw new NotFoundException(`Pokemon with objectId '${id}' not found`);
  }
}
