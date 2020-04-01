import React from 'react';
import './item.scss';
import { PokemonI } from '../../services/types';
import { Button } from '../button';

interface PropsI {
    pokemon: PokemonI;
}
export function Pokemon({ pokemon }: PropsI): JSX.Element {
    return (
        <div className="pokemon-item-component">
            <img src={pokemon.sprites.back_default}></img>
            <div className="info">
                <strong className="name-label">Nome: </strong>
                <p className="name">{pokemon.name}</p>
                <strong className="price-label">Preço: </strong>
                <p className="price">{pokemon.price}</p>
            </div>
            <Button text="Adicionar" icon="add" />
        </div>
    );
}
