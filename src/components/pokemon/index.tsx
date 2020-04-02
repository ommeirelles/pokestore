import React from 'react';
import './item.scss';
import { PokemonI } from '../../services/types';
import { Button } from '../button';
import { useCartstore, AddPokemonToStoreAction } from '../../context';

interface PropsI {
    pokemon: PokemonI;
}
export function Pokemon({ pokemon }: PropsI): JSX.Element {
    const [, dispatchCart] = useCartstore();

    function addItem(): void {
        return dispatchCart(AddPokemonToStoreAction(pokemon));
    }

    return (
        <div className="pokemon-item-component">
            <img alt={`pokemon ${pokemon.name}`} src={pokemon.sprites.back_default}></img>
            <div className="info">
                <strong className="name-label">Nome: </strong>
                <p className="name">{pokemon.name}</p>
                <strong className="price-label">Preço: </strong>
                <p className="price">{pokemon.price}</p>
            </div>
            <Button onClick={addItem} text="Adicionar" icon="add" />
        </div>
    );
}
