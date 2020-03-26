import React from 'react';
import './select.scss';

interface PropsI {
    children: JSX.Element[];
    className?: string;
    defaultValue: string;
    name?: string;
    id?: string;
}

export function Select({ children, className = '', defaultValue = 'Outros', name, id }: PropsI): JSX.Element {
    return (
        <select name={name} id={id} className={`select-component ${className}`}>
            <option value={defaultValue} selected>
                {defaultValue}
            </option>
            {children}
        </select>
    );
}
