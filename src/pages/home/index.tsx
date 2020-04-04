import React, { useEffect, useRef, MutableRefObject, useLayoutEffect, useState } from 'react';
import './_home.scss';
import { Header, Pokemon, Loading, Cart } from '../../components';
import {
    usePokestore,
    getPokemons,
    getPokemonListFromType,
    loadMorePokemons,
    getPokemonTypes,
    getTypeSelected,
    setFirstsPokemonsFromType,
} from '../../context';
import { debounce } from '../../utils';

export function HomePage(): JSX.Element {
    const [pokemonStore, dispatchToPokeStore] = usePokestore();
    const pokemons = getPokemons(pokemonStore);
    const pokeRef = useRef<HTMLDivElement>();
    const pokemonsListFromType = getPokemonListFromType(pokemonStore);
    const [loadingMore, setLoadingMore] = useState(false);
    const type = getTypeSelected(pokemonStore);

    useEffect(() => {
        getPokemonTypes(dispatchToPokeStore);
        //const doc = document.documentElement;
        //doc.style.setProperty('--app-main-color', 'blue');
    }, []);

    useLayoutEffect(() => {
        const scrollFn = debounce((): void => {
            const { scrollHeight = 0, scrollTop = 0 } = pokeRef.current as HTMLDivElement;
            if (scrollHeight && scrollTop && scrollHeight - scrollTop <= 400) {
                const list =
                    pokemonsListFromType.filter(i => !pokemons.map(i => i.name).includes(i)).slice(0, 10) || [];
                setLoadingMore(true);
                loadMorePokemons(list)(dispatchToPokeStore).then(() => setLoadingMore(false));
            }
        }, 300);
        if (pokeRef?.current) {
            pokeRef.current.addEventListener('scroll', scrollFn);
            return (): void => pokeRef.current?.removeEventListener('scroll', scrollFn);
        }
    }, [pokeRef, pokemonsListFromType, pokemons]);

    useEffect(() => {
        if (type) {
            setLoadingMore(true);
            setFirstsPokemonsFromType(type)(dispatchToPokeStore).then(() => setLoadingMore(false));
        }
    }, [type]);

    return (
        <div className="home-page">
            <Header />
            <div className="pokemons" ref={(pokeRef as unknown) as MutableRefObject<HTMLDivElement>}>
                {pokemons && pokemons.length ? pokemons.map(p => <Pokemon key={p.id} pokemon={p} />) : null}
                {loadingMore ? (
                    <div className="loading">
                        <Loading />
                    </div>
                ) : null}
            </div>
            <Cart />
        </div>
    );
}
