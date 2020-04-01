import React, { useState, ChangeEvent, useEffect } from 'react';
import './header.scss';
import { Input, Select } from '../';
import { getTypes, usePokestore, setFirstsPokemonsFromType } from '../../context';
// import { PokeService } from '../../services';

export function Header(): JSX.Element {
    const [type, setType] = useState<string>('');
    const [pokeState, dispatch] = usePokestore();
    const types = getTypes(pokeState);

    const selectType = (ev: ChangeEvent<HTMLSelectElement>): void => setType(ev.target?.value);

    useEffect(() => {
        const t = parseInt(type, 10);
        const typeObject: { name: string; id: number } | undefined = types.find(i => i.id === t);
        if (t && typeObject?.name) {
            setFirstsPokemonsFromType(typeObject)(dispatch);
        }
    }, [type, dispatch, types]);

    useEffect(() => {
        if (!type && types && types.length) {
            setType(types[0].id.toString());
        }
    }, [pokeState, types, type]);

    return (
        <div className="header-component">
            <Input placeholder="procurar" className="input-header" icon="search" name="search" id="search" />
            <label className="types-label" htmlFor="types">
                Tipos:{' '}
            </label>
            <Select onChange={selectType} name="pokemon types" id="types">
                {types.map(t => (
                    <option key={t.name} value={t.id} selected={type === t.id.toString()}>
                        {t.name}
                    </option>
                ))}
            </Select>
        </div>
    );
}
