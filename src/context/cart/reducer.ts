import { PokemonI } from '../../services/types';

export interface CartStateI {
    items: {
        [key: number]: { quantity: number; pokemon: PokemonI };
    };
}

export enum CartActions {
    ADD_ITEM = 'ADD_ITEM',
}

export function CartReducer(state: CartStateI, { type, payload }: { type: string; payload: PokemonI }): CartStateI {
    switch (type) {
        case CartActions.ADD_ITEM: {
            if (payload) {
                const { items = {} } = state;
                const { quantity = 0 } = (items && items[payload.id]) || {};
                return {
                    ...state,
                    items: {
                        ...items,
                        [payload.id]: {
                            quantity: quantity + 1,
                            pokemon: payload,
                        },
                    },
                };
            }
            return state;
        }
        default:
            return state;
    }
}
