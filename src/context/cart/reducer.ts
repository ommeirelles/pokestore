import { PokemonI } from '../../services/types';

export interface CartStateI {
    items: {
        [key: number]: { quantity: number; pokemon: PokemonI };
    };
}

export enum CartActions {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_POKEMON = 'REMOVE_POKEMON',
    CLEAR = 'CLEAR',
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
        case CartActions.REMOVE_POKEMON: {
            const { items: stateItems = {} } = state;
            const items = Object.entries(stateItems).reduce((total, [id, e]) => {
                if (id === payload.id.toString()) {
                    return total;
                }

                return { ...total, [id]: e };
            }, {});
            return { ...state, items };
        }
        case CartActions.CLEAR: {
            return { ...state, items: {} };
        }
        default:
            return state;
    }
}
