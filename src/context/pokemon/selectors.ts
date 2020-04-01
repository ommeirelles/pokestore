import { PokeStoreI } from './reducer';
import { PokemonI } from '../../services/types';

export function getTypes({ types }: PokeStoreI): { name: string; id: number }[] {
    const keys = Object.entries(types || {});
    return (
        keys?.reduce((acumulator: { name: string; id: number }[], [name, i]) => {
            const items = i.url?.split('/').filter(Boolean);
            const id = (items && items.length && items.slice(-1)[0]) || '0';
            if (parseInt(id, 10)) {
                return acumulator.concat([
                    {
                        name,
                        id: parseInt(id, 10),
                    },
                ]);
            }
            return acumulator;
        }, []) || []
    );
}

export function getPokemons({ pokemons }: PokeStoreI): PokemonI[] {
    return pokemons || [];
}
