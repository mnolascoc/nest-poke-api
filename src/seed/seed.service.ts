import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { nro: number; name: string }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length - 2]; // el + es para convertir a un number

      pokemonToInsert.push({ nro, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }

  // async executeSeed() {
  //   await this.pokemonModel.deleteMany({});

  //   const { data } = await this.axios.get<PokeResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=10',
  //   );

  //   const insertPromisesArray = [];

  //   data.results.forEach(({ name, url }) => {
  //     const segments = url.split('/');
  //     const nro: number = +segments[segments.length - 2]; // el + es para convertir a un number

  //     insertPromisesArray.push(this.pokemonModel.create({ nro, name }));
  //     //await this.pokemonModel.create({ nro, name });
  //   });

  //   await Promise.all(insertPromisesArray);

  //   return 'Seed executed';
  // }
}
