import { PokemonI } from '../../services/types';
import { CartActions } from './reducer';

export function AddPokemonToStoreAction(pokemon: PokemonI): { type: string; payload: PokemonI } {
    return { type: CartActions.ADD_ITEM, payload: pokemon };
}

export function RemovePokemonFromStoreAction(pokemon: PokemonI): { type: string; payload: PokemonI } {
    return { type: CartActions.REMOVE_POKEMON, payload: pokemon };
}
