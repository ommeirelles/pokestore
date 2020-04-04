import { PokemonI } from '../../services/types';

export interface ActionI {
    type: string;
    payload?: any;
}

interface TypesI {
    [type: string]: {
        name: string;
        url: string;
        pokemons?: string[];
    };
}

export interface PokeStoreI {
    types?: TypesI;
    pokemons?: PokemonI[];
    typeSelected?: string;
}

export enum PokeStoreActions {
    LOAD_TYPES = 'LOAD_TYPES',
    SET_POKEMONS_BY_TYPE = 'SET_POKEMONS_BY_TYPE',
    ADD_POKEMON = 'ADD_POKEMON',
    CLEAR_POKEMONS = 'CLEAR_POKEMONS',
    SET_SELECTED_TYPE = 'SET_SELECTED_TYPE',
}

export function PokestoreReducer(state = {} as PokeStoreI, { type, payload }: ActionI): PokeStoreI {
    switch (type) {
        case PokeStoreActions.LOAD_TYPES: {
            return { ...state, types: payload as TypesI };
        }
        case PokeStoreActions.SET_POKEMONS_BY_TYPE: {
            const { type, pokemons } = payload;
            const stateType = state.types && state.types[type];
            return {
                ...state,
                types: {
                    ...state.types,
                    [type]: {
                        ...stateType,
                        pokemons,
                    },
                },
            };
        }
        case PokeStoreActions.ADD_POKEMON: {
            const { pokemons = [] } = state;
            const pokes = [...pokemons, payload].reduce((result, pokemon) => {
                if (result.find((i: PokemonI) => i.id === pokemon.id)) {
                    return result;
                }
                return [...result, pokemon];
            }, []);
            return {
                ...state,
                pokemons: pokes,
            };
        }
        case PokeStoreActions.CLEAR_POKEMONS: {
            return { ...state, pokemons: [] };
        }
        case PokeStoreActions.SET_SELECTED_TYPE: {
            return { ...state, typeSelected: payload };
        }
        default: {
            return state;
        }
    }
}
