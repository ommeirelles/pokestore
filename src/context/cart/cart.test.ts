import { CartActions, CartReducer, CartStateI } from './reducer';
import { PokemonI } from '../../services/types';

describe('Test Cart Reducer', () => {
    it('add pokemon to cart', () => {
        const state = CartReducer({} as CartStateI, {
            type: CartActions.ADD_ITEM,
            payload: { id: 1, name: 'charmander' } as PokemonI,
        });
        expect(state).toStrictEqual({
            items: {
                1: { quantity: 1, pokemon: { id: 1, name: 'charmander' } as PokemonI },
            },
        });
    });

    it('add pokemon item to cart to improve quantity', () => {
        const state = CartReducer(
            {
                items: { 1: { quantity: 1, pokemon: { id: 1, name: 'charmander' } as PokemonI } },
            } as CartStateI,
            {
                type: CartActions.ADD_ITEM,
                payload: { id: 1, name: 'charmander' } as PokemonI,
            },
        );
        expect(state).toStrictEqual({
            items: {
                1: { quantity: 2, pokemon: { id: 1, name: 'charmander' } as PokemonI },
            },
        });
    });

    it('remove pokemon from cart store', () => {
        const state = CartReducer(
            {
                items: {
                    1: { quantity: 1, pokemon: { id: 1, name: 'charmander' } as PokemonI },
                    5: { quantity: 5, pokemon: { id: 5, name: 'charmander' } as PokemonI },
                },
            } as CartStateI,
            {
                type: CartActions.REMOVE_POKEMON,
                payload: { id: 1, name: 'charmander' } as PokemonI,
            },
        );
        expect(state).toStrictEqual({
            items: {
                5: { quantity: 5, pokemon: { id: 5, name: 'charmander' } as PokemonI },
            },
        });
    });

    it('clear cart store', () => {
        const state = CartReducer(
            {
                items: {
                    1: { quantity: 1, pokemon: { id: 1, name: 'charmander' } as PokemonI },
                    5: { quantity: 5, pokemon: { id: 5, name: 'charmander' } as PokemonI },
                },
            } as CartStateI,
            {
                type: CartActions.CLEAR,
                payload: undefined,
            },
        );
        expect(state).toStrictEqual({
            items: {},
        });
    });
});
