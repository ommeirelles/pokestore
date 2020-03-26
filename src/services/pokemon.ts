import { PokemonI, TypeI } from './types';
import { CallPokeAPI, CallerType } from './call';

class PokemonService {
    private ApiCaller: CallerType;

    constructor(API: CallerType) {
        this.ApiCaller = API;
    }

    getPokemonList(start = 0, limit = 5): Promise<PokemonI[]> {
        return this.ApiCaller<PokemonI[]>(`pokemon?offset=${start}&limit=${limit}`);
    }

    getTypes(): Promise<TypeI> {
        return this.ApiCaller<TypeI>(`type`);
    }
}

export default new PokemonService(CallPokeAPI);
