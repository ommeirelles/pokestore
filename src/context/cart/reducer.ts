import { PokemonI } from '../../services/types';

export interface CartStateI {
    items: PokemonI[];
}

export enum CartActions {
    ADD_ITEM = 'ADD_ITEM',
}

export function CartReducer(state: CartStateI, { type, payload }: { type: string; payload: PokemonI }): CartStateI {
    switch (type) {
        case CartActions.ADD_ITEM: {
            if (payload) {
                const { items = [] } = state;
                return { ...state, items: [...items, payload] };
            }
            return state;
        }
        default:
            return state;
    }
}
