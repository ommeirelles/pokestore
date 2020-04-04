import React, { useState, ChangeEvent, useEffect } from 'react';
import './header.scss';
import { Input, Select } from '../';
import { getTypes, usePokestore, clearPokemons, setSelectedType, getTypeSelected } from '../../context';
// import { PokeService } from '../../services';

export function Header(): JSX.Element {
    const [pokeState, dispatch] = usePokestore();
    const types = getTypes(pokeState);
    const type = getTypeSelected(pokeState);

    const selectType = (ev: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(clearPokemons());
        dispatch(setSelectedType(ev.target?.value));
    };

    return (
        <div className="header-component">
            <Input placeholder="procurar" className="input-header" icon="search" name="search" id="search" />
            <label className="types-label" htmlFor="types">
                Tipos:{' '}
            </label>
            <Select value={type} onChange={selectType} name="pokemon types" id="types">
                {types.map(t => (
                    <option key={t.name} value={t.id}>
                        {t.name}
                    </option>
                ))}
            </Select>
        </div>
    );
}
