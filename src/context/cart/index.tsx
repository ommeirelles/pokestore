import React, { Dispatch, useEffect } from 'react';
import { CartStateI, CartReducer } from './reducer';
import { PokemonI } from '../../services/types';

export { CartActions, CartReducer } from './reducer';
export { AddPokemonToStoreAction, RemovePokemonFromStoreAction, ClearCart } from './actions';

type context = [CartStateI, Dispatch<{ type: string; payload: PokemonI | undefined }>];
const CartContext = React.createContext<context>((null as unknown) as context);

export function useCartstore(): context {
    const context = React.useContext<context>(CartContext);
    if (!context) {
        throw new Error(`useCartstore must be used within a CartContext`);
    }
    return context;
}

export function CartProvider({ children }: { children: JSX.Element }): JSX.Element {
    let storeInitialState = {};
    storeInitialState = JSON.parse(localStorage?.getItem('cart') || '{}') || {};
    const [state, dispatch] = React.useReducer(CartReducer, storeInitialState as CartStateI);
    const value = React.useMemo(() => [state, dispatch], [state]);

    useEffect(() => {
        if (state) {
            localStorage?.setItem('cart', JSON.stringify(state));
        }
    }, [state]);

    return <CartContext.Provider value={(value as unknown) as context}>{children}</CartContext.Provider>;
}

export function getTotalStore({ items }: CartStateI): string {
    const t = Object.entries(items).reduce((total, [id, { quantity: q, pokemon: p }]) => {
        return total + q * p.price;
    }, 0);
    return t.toFixed(2);
}
