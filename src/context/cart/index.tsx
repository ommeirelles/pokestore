import React, { Dispatch } from 'react';
import { CartActions, CartStateI, CartReducer } from './reducer';
import { PokemonI } from '../../services/types';

export { CartActions, CartReducer } from './reducer';
export { AddPokemonToStoreAction } from './actions';

type context = [CartStateI, Dispatch<{ type: string; payload: PokemonI }>];
const CartContext = React.createContext<context>((null as unknown) as context);

export function useCartstore(): context {
    const context = React.useContext<context>(CartContext);
    if (!context) {
        throw new Error(`useCartstore must be used within a CartContext`);
    }
    return context;
}

export function CartProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [state, dispatch] = React.useReducer(CartReducer, {} as CartStateI);
    const value = React.useMemo(() => [state, dispatch], [state]);

    return <CartContext.Provider value={(value as unknown) as context}>{children}</CartContext.Provider>;
}
