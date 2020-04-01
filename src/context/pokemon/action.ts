import { PokeService } from '../../services';
import { PokeStoreActions, ActionI } from './reducer';
import { Dispatch } from 'react';

export function setFirstsPokemonsFromType({
    id,
    name: type,
}: {
    id: number;
    name: string;
}): (dispatch: Dispatch<ActionI>) => void {
    return function(dispatch): void {
        PokeService.getPokemonsFromType(id).then(pokemons => {
            dispatch({
                type: PokeStoreActions.SET_POKEMONS_BY_TYPE,
                payload: {
                    type,
                    pokemons: pokemons.map(i => i.name),
                },
            });

            Promise.all(
                pokemons.slice(0, 7).map(i => {
                    return PokeService.getPokemonData(i.name);
                }),
            ).then(pokemons => {
                pokemons.map(i =>
                    dispatch({
                        type: PokeStoreActions.ADD_POKEMON,
                        payload: { pokemons: { ...i, price: (Math.random() * 1000).toFixed(2) }, type },
                    }),
                );
            });
        });
    };
}
