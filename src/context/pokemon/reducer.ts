import { MapNameURLI } from '../../services/types';

export interface ActionI {
    type: string;
    payload?: any;
}

export interface PokeStoreI {
    types?: MapNameURLI[];
    pokemons?: {
        [type: string]: MapNameURLI[];
    };
}

export enum PokeStoreActions {
    LOAD_TYPES = 'LOAD_TYPES',
}

export function PokestoreReducer(state = {} as PokeStoreI, { type, payload }: ActionI): PokeStoreI {
    console.warn(payload);

    switch (type) {
        case PokeStoreActions.LOAD_TYPES: {
            return { ...state, types: payload as MapNameURLI[] };
        }
        default: {
            return state;
        }
    }
}
