import { MapNameURLI, PokemonI } from './types';
import { CallPokeAPI, CallerType } from './call';

class PokemonService {
    private ApiCaller: CallerType;

    constructor(API: CallerType) {
        this.ApiCaller = API;
    }

    getPokemonList(start = 0, limit = 9999): Promise<{ results: MapNameURLI[] }> {
        return this.ApiCaller<{ results: MapNameURLI[] }>(`pokemon?offset=${start}&limit=${limit}`);
    }

    getTypes(): Promise<{ [type: string]: MapNameURLI }> {
        return this.ApiCaller<{ results: MapNameURLI[] }>(`type`).then(({ results }) => {
            return results.reduce(
                (a, i) => ({
                    ...a,
                    [i.name]: i,
                }),
                {},
            );
        });
    }

    getPokemonsFromType(type: string): Promise<MapNameURLI[]> {
        return this.ApiCaller<{ pokemon: { pokemon: MapNameURLI }[] }>(`type/${type}`).then(({ pokemon = [] }) => {
            return pokemon.map(({ pokemon }) => pokemon);
        });
    }

    getPokemonData(name: string): Promise<PokemonI> {
        return this.ApiCaller<PokemonI>(`pokemon/${name}`);
    }
}

export const service = new PokemonService(CallPokeAPI);
