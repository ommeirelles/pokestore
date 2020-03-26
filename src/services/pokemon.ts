import { MapNameURLI } from './types';
import { CallPokeAPI, CallerType } from './call';

class PokemonService {
    private ApiCaller: CallerType;

    constructor(API: CallerType) {
        this.ApiCaller = API;
    }

    getPokemonList(start = 0, limit = 9999): Promise<{ results: MapNameURLI[] }> {
        return this.ApiCaller<{ results: MapNameURLI[] }>(`pokemon?offset=${start}&limit=${limit}`);
    }

    getTypes(): Promise<{ results: MapNameURLI[] }> {
        return this.ApiCaller<{ results: MapNameURLI[] }>(`type`);
    }
}

export const service = new PokemonService(CallPokeAPI);
