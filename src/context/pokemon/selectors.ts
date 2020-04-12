import { PokeStoreI } from './reducer';
import { PokemonI } from '../../services/types';

export function getTypes({ types }: PokeStoreI): { name: string; pokemons: string[] }[] {
    const keys = Object.entries(types || {});
    return keys?.map(([, { name, pokemons = [] }]) => ({ name, pokemons })) || [];
}

export function getPokemons({ pokemons }: PokeStoreI): PokemonI[] {
    return pokemons || [];
}

export function getPokemonListFromType({ typeSelected, types }: PokeStoreI): string[] {
    return (typeSelected && types && types[typeSelected] && types[typeSelected].pokemons) || [];
}

export function getTypeSelected({ typeSelected }: PokeStoreI): string {
    return typeSelected || '';
}

export function getFindResults({ findResults }: PokeStoreI): PokemonI[] {
    return findResults || [];
}
