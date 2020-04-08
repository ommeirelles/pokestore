import React, { ChangeEvent, useState } from 'react';
import './header.scss';
import { Input, Select, Button } from '../';
import { Cart } from '../cart';

interface PropsI {
    onSearchChange?: (search: string) => void;
    onSelectChange?: (t?: string) => void;
    types: {
        name: string;
        pokemons?: string[];
    }[];
    type: string;
}
export function Header({ onSearchChange, onSelectChange, types, type }: PropsI): JSX.Element {
    const [inputValue, setInput] = useState<string>('');
    const [cartMenu, setCartMenu] = useState(false);

    const selectType = (ev: ChangeEvent<HTMLSelectElement>): void => {
        onSelectChange && onSelectChange(ev.target?.value || '');
        setInput('');
        onSearchChange && onSearchChange('');
    };

    const searchInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
        onSearchChange && onSearchChange(ev.target?.value);
        setInput(ev.target?.value);
    };

    return (
        <>
            <div className="header-component">
                <Input
                    value={inputValue}
                    onChange={searchInputChange}
                    placeholder="procurar"
                    className="input-header"
                    icon="search"
                    name="search"
                    id="search"
                />
                <label className="types-label" htmlFor="types">
                    Tipos:{' '}
                </label>
                <Select value={type} onChange={selectType} name="pokemon types" id="types">
                    {types.map(t => (
                        <option key={t.name} value={t.name}>
                            {t.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={(): void => setCartMenu(!cartMenu)} className="cart" icon="shopping_basket" />
            </div>
            <Cart className={cartMenu ? 'open' : ''} />
        </>
    );
}
