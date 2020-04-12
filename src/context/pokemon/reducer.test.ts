import { PokestoreReducer, PokeStoreActions } from './reducer';
import { clearPokemons } from './action';
import { PokemonList } from '../../utils';
import { PokemonI } from '../../services/types';
import { getFindResults, getPokemonListFromType, getPokemons, getTypeSelected, getTypes } from './selectors';

describe('Test Pokemon Store', () => {
    it('should return empty pokemons on empty store', () => {
        expect(PokestoreReducer({}, clearPokemons())).toEqual({ pokemons: [] });
    });

    it('should return empty pokemons on store filled', () => {
        expect(
            PokestoreReducer(
                {
                    types: {
                        ['normal']: { name: 'normal', url: '', pokemons: ['Pikachu'] },
                    },
                },
                clearPokemons(),
            ),
        ).toEqual({
            types: {
                ['normal']: { name: 'normal', url: '', pokemons: ['Pikachu'] },
            },
            pokemons: [],
        });
    });

    it('should set find result pokemons', () => {
        const initialState = {
            types: {
                ['normal']: { name: 'normal', url: '', pokemons: ['Pikachu'] },
            },
        };
        const state = PokestoreReducer(initialState, { type: PokeStoreActions.SET_FIND_RESULT, payload: [{ id: 1 }] });
        expect(state).toEqual({ ...state, findResults: [{ id: 1 }] });
    });

    it('set selected type', () => {
        expect(PokestoreReducer({}, { type: PokeStoreActions.SET_SELECTED_TYPE, payload: 'dark' })).toEqual({
            typeSelected: 'dark',
        });
    });

    it('set pokemons for type', () => {
        expect(
            PokestoreReducer(
                {
                    types: {
                        dark: {
                            name: 'dark',
                            url: '',
                            pokemons: [],
                        },
                    },
                },
                { type: PokeStoreActions.SET_POKEMONS_BY_TYPE, payload: { type: 'dark', pokemons: ['ghastly'] } },
            ),
        ).toEqual({
            types: {
                ['dark']: {
                    name: 'dark',
                    url: '',
                    pokemons: ['ghastly'],
                },
            },
        });
    });

    it('set pokemons for empty type', () => {
        expect(
            PokestoreReducer(
                {
                    types: {},
                },
                { type: PokeStoreActions.SET_POKEMONS_BY_TYPE, payload: { type: 'dark', pokemons: ['ghastly'] } },
            ),
        ).toStrictEqual({
            types: {
                ['dark']: {
                    pokemons: ['ghastly'],
                },
            },
        });
    });

    it('set types', () => {
        const state = PokestoreReducer(
            {},
            { type: PokeStoreActions.LOAD_TYPES, payload: { dark: { name: 'dark', url: '' } } },
        );
        expect(state).toEqual({
            types: {
                dark: {
                    name: 'dark',
                    url: '',
                },
                todos: {
                    name: 'todos',
                    url: '',
                    pokemons: PokemonList,
                },
            },
        });
    });

    it('add Pokemon to store', () => {
        const state = PokestoreReducer({}, { type: PokeStoreActions.ADD_POKEMON, payload: { id: 1 } });
        expect(state).toStrictEqual({ pokemons: [{ id: 1 }] });
    });

    it('add the same Pokemon to store again', () => {
        const state = PokestoreReducer(
            { pokemons: [{ id: 1 } as PokemonI, { id: 3 } as PokemonI] },
            { type: PokeStoreActions.ADD_POKEMON, payload: { id: 1 } },
        );
        expect(state).toStrictEqual({ pokemons: [{ id: 1 }, { id: 3 }] });
    });

    it('add another pokemon to store', () => {
        const state = PokestoreReducer(
            { pokemons: [{ id: 1 } as PokemonI, { id: 3 } as PokemonI] },
            { type: PokeStoreActions.ADD_POKEMON, payload: { id: 2 } },
        );
        expect(state).toStrictEqual({ pokemons: [{ id: 1 }, { id: 3 }, { id: 2 }] });
    });
});

describe('test pokestore selectors', () => {
    it('should return find results', () => {
        expect(getFindResults({ findResults: [{ name: 'ghastly', id: 1 } as PokemonI] })).toEqual([
            { name: 'ghastly', id: 1 },
        ]);
    });

    it('should return pokemons from type', () => {
        expect(
            getPokemonListFromType({
                types: { normal: { name: 'normal', url: '', pokemons: ['ratata'] } },
                typeSelected: 'normal',
            }),
        ).toEqual(['ratata']);
    });

    it('should return pokemons from type', () => {
        expect(getPokemons({ pokemons: [{ id: 1, name: 'Pidgey' } as PokemonI] })).toEqual([{ id: 1, name: 'Pidgey' }]);
    });

    it('should return selectedType', () => {
        expect(getTypeSelected({ typeSelected: 'fire' })).toEqual('fire');
    });

    it('should return type list', () => {
        expect(getTypes({ types: { fire: { name: 'fire', url: '', pokemons: ['charmander'] } } })).toEqual([
            { name: 'fire', pokemons: ['charmander'] },
        ]);
    });
});
