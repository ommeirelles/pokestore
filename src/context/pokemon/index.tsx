import React, { Dispatch } from 'react';
import { PokestoreReducer, PokeStoreI, ActionI } from './reducer';

// exports
export { PokeStoreActions } from './reducer';
export { getTypes, getPokemons, getPokemonListFromType, getTypeSelected, getFindResults } from './selectors';
export {
    setFirstsPokemonsFromType,
    clearPokemons,
    loadMorePokemons,
    getPokemonTypes,
    setSelectedType,
    findPokemons,
} from './action';

type context = [PokeStoreI, Dispatch<ActionI>];
const PokemonContext = React.createContext<context>((null as unknown) as context);

export function usePokestore(): context {
    const context = React.useContext<context>(PokemonContext);
    if (!context) {
        throw new Error(`usePokestore must be used within a PokestoreProvider`);
    }
    return context;
}

export function PokestoreProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [state, dispatch] = React.useReducer(PokestoreReducer, {} as PokeStoreI);
    const value = React.useMemo(() => [state, dispatch], [state]);
    return <PokemonContext.Provider value={(value as unknown) as context}>{children}</PokemonContext.Provider>;
}
