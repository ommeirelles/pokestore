import React, { useEffect, useRef, MutableRefObject, useLayoutEffect, useState } from 'react';
import './_home.scss';
import { Header, Pokemon, Loading } from '../../components';
import {
    usePokestore,
    getPokemons,
    getPokemonListFromType,
    loadMorePokemons,
    getPokemonTypes,
    getTypeSelected,
    setFirstsPokemonsFromType,
    getFindResults,
    getTypes,
    findPokemons,
    setSelectedType,
    clearPokemons,
} from '../../context';
import { debounce } from '../../utils';
import { ThemeService } from '../../services';

export function HomePage(): JSX.Element {
    const [loadingMore, setLoadingMore] = useState(false);
    const [isSearching, setSearching] = useState(false);
    const [pokemonStore, dispatchToPokeStore] = usePokestore();
    const pokemons = getPokemons(pokemonStore);
    const pokemonsListFromType = getPokemonListFromType(pokemonStore);
    const type = getTypeSelected(pokemonStore);
    const types = getTypes(pokemonStore);
    const findResults = getFindResults(pokemonStore);
    const pokeRef = useRef<HTMLDivElement>();

    const scrollFn = debounce((): void => {
        const { scrollHeight = 0, scrollTop = 0, clientHeight = 0 } = pokeRef.current as HTMLDivElement;
        if (
            scrollHeight &&
            clientHeight &&
            scrollTop &&
            scrollHeight - (scrollTop + clientHeight) <= 400 &&
            !isSearching
        ) {
            const list = pokemonsListFromType.filter(i => !pokemons.map(i => i.name).includes(i)).slice(0, 10) || [];
            setLoadingMore(true);
            loadMorePokemons(list)(dispatchToPokeStore)
                .then(() => setLoadingMore(false))
                .catch(err => {
                    setLoadingMore(false);
                    return err;
                });
        }
    }, 300);

    const findDispatch = debounce(([value = '']) => {
        if (value.length) {
            setSearching(true);
            const list = types.find(i => i.name == type)?.pokemons || [];
            setLoadingMore(true);
            findPokemons(value, list)(dispatchToPokeStore).then(() => setLoadingMore(false));
        } else {
            setSearching(false);
        }
    }, 700);

    const selectChange = (type = ''): void => {
        dispatchToPokeStore(clearPokemons());
        dispatchToPokeStore(setSelectedType(type));
    };

    useEffect(() => {
        getPokemonTypes(dispatchToPokeStore);
    }, []);

    useLayoutEffect(() => {
        if (pokeRef?.current) {
            pokeRef.current.addEventListener('scroll', scrollFn);
            return (): void => pokeRef.current?.removeEventListener('scroll', scrollFn);
        }
    }, [pokeRef, pokemonsListFromType, pokemons, isSearching]);

    useEffect(() => {
        if (type) {
            ThemeService.changeThemeVariables(type);
            setLoadingMore(true);
            setSearching(false);
            if (type != 'todos') {
                setFirstsPokemonsFromType(type)(dispatchToPokeStore).then(() => setLoadingMore(false));
            } else {
                const l = types && type && types.find(i => i.name === type)?.pokemons;
                loadMorePokemons(l?.slice(0, 10) || [])(dispatchToPokeStore).then(() => setLoadingMore(false));
            }
        }
    }, [type]);

    const getPageState = (): JSX.Element[] | JSX.Element => {
        const notFound = <p className="not-found">Nenhum pokemon encontrado</p>;

        if (isSearching && findResults && findResults.length) {
            return findResults.map(p => <Pokemon key={p.id} pokemon={p} />);
        }
        if (!isSearching && pokemons && pokemons.length) {
            return pokemons.map(p => <Pokemon key={p.id} pokemon={p} />);
        }
        return notFound;
    };

    return (
        <>
            <div className="home-page">
                <Header types={types} type={type} onSearchChange={findDispatch} onSelectChange={selectChange} />
                <div className="pokemons" ref={(pokeRef as unknown) as MutableRefObject<HTMLDivElement>}>
                    {getPageState()}
                    {loadingMore && (
                        <div className="loading">
                            <Loading />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
