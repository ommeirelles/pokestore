import React from 'react';
import './header.scss';
import { Input, Select } from '../';
import { getTypes, usePokestore } from '../../context';

export function Header(): JSX.Element {
    const [pokeState] = usePokestore();
    const types = getTypes(pokeState);
    return (
        <div className="header-component">
            <Input className="input-header" icon="search" name="search" id="search" />
            <Select name="pokemon types" id="types" defaultValue="TODOS OS TIPOS">
                {types.map(t => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </Select>
        </div>
    );
}
