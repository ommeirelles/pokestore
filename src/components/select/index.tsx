import React, { ChangeEvent } from 'react';
import './select.scss';

interface PropsI {
    children: JSX.Element[];
    className?: string;
    defaultValue?: string;
    name?: string;
    id?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ children, className = '', defaultValue, name, id, onChange }: PropsI): JSX.Element {
    return (
        <select
            defaultValue={defaultValue}
            onChange={onChange}
            name={name}
            id={id}
            className={`select-component ${className}`}
        >
            {defaultValue && <option value={defaultValue}>{defaultValue}</option>}
            {children}
        </select>
    );
}
