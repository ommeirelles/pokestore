import React, { useEffect } from 'react';
import './_home.scss';
import { Header, Pokemon, Loading } from '../../components';
import { usePokestore, PokeStoreActions, getPokemons } from '../../context';
import { PokeService } from '../../services';

export function HomePage(): JSX.Element {
    const [pokemonStore, dispatchToPokeStore] = usePokestore();
    const pokemons = getPokemons(pokemonStore);

    useEffect(() => {
        PokeService.getTypes().then(payload => {
            dispatchToPokeStore({
                type: PokeStoreActions.LOAD_TYPES,
                payload: payload,
            });
        });
        // const doc = document.documentElement;
        //     doc.style.setProperty('--app-main-color', 'blue');
    }, []);

    return (
        <div className="home-page">
            <Header />
            <div className="pokemons">
                {pokemons && pokemons.length ? pokemons.map(p => <Pokemon key={p.id} pokemon={p} />) : <Loading />}
            </div>
        </div>
    );
}
