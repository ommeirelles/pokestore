import { PokeService } from '../../services';
import { PokeStoreActions, ActionI } from './reducer';
import { Dispatch } from 'react';

export function setFirstsPokemonsFromType(type: string): (dispatch: Dispatch<ActionI>) => Promise<any> {
    return function(dispatch): Promise<any> {
        return new Promise(resolve => {
            PokeService.getPokemonsFromType(type).then(pokemons => {
                dispatch({
                    type: PokeStoreActions.SET_POKEMONS_BY_TYPE,
                    payload: {
                        type,
                        pokemons: pokemons.map(i => i.name),
                    },
                });

                dispatch({
                    type: PokeStoreActions.SET_SELECTED_TYPE,
                    payload: type,
                });

                Promise.all(
                    pokemons.slice(0, 7).map(i => {
                        return PokeService.getPokemonData(i.name);
                    }),
                ).then(pokemons => {
                    pokemons.map(i =>
                        dispatch({
                            type: PokeStoreActions.ADD_POKEMON,
                            payload: { ...i, price: (Math.random() * 1000).toFixed(2) },
                        }),
                    );
                    resolve();
                });
            });
        });
    };
}

export function clearPokemons(): { type: string } {
    return {
        type: PokeStoreActions.CLEAR_POKEMONS,
    };
}

export function loadMorePokemons(list: string[]): (dispatch: Dispatch<ActionI>) => Promise<any> {
    return (dispatch): Promise<any> => {
        return Promise.all(list.map(i => PokeService.getPokemonData(i))).then(pokemons => {
            pokemons.map(i =>
                dispatch({
                    type: PokeStoreActions.ADD_POKEMON,
                    payload: { ...i, price: (Math.random() * 1000).toFixed(2) },
                }),
            );
        });
    };
}

export function setSelectedType(type: string): { type: string; payload: string } {
    return {
        type: PokeStoreActions.SET_SELECTED_TYPE,
        payload: type,
    };
}

export function getPokemonTypes(dispatch: Dispatch<ActionI>): Promise<void> {
    return PokeService.getTypes().then(payload => {
        dispatch({
            type: PokeStoreActions.LOAD_TYPES,
            payload: payload,
        });

        payload && payload.normal && dispatch(setSelectedType(payload.normal.name));
    });
}
