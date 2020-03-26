import { PokeStoreI } from './reducer';

export function getTypes({ types }: PokeStoreI): string[] {
    return types?.map(i => i.name) || [];
}
