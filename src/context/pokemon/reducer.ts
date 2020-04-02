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
}

export enum PokeStoreActions {
    LOAD_TYPES = 'LOAD_TYPES',
    SET_POKEMONS_BY_TYPE = 'SET_POKEMONS_BY_TYPE',
    ADD_POKEMON = 'ADD_POKEMON',
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
            const { pokemons: payloadPokemons, type } = payload;
            const newPokemons = [...pokemons, payloadPokemons].reduce((pokes, i: PokemonI) => {
                //remove duplicated
                if (pokes.find((p: PokemonI) => i.id === p.id)) {
                    return pokes;
                }
                //Only insert if type is equal selected type
                if (i.types.find(i => i.type.name === type)) {
                    return [...pokes, i];
                }
                return pokes;
            }, []);
            return {
                ...state,
                pokemons: newPokemons,
            };
        }
        default: {
            return state;
        }
    }
}
