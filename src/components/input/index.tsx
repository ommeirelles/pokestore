import React, { ChangeEvent } from 'react';
import './input.scss';

interface Props {
    name?: string;
    id?: string;
    className?: string;
    icon?: string;
    placeholder?: string;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export function Input({ value, placeholder, name, id, className, icon, onChange }: Props): JSX.Element {
    return (
        <div className={`input-component ${className || ''}`}>
            {icon ? <span className="icon material-icons">{icon}</span> : null}
            {!value ? (
                <label className="placeholder" htmlFor={name}>
                    {placeholder}
                </label>
            ) : null}
            <input value={value} onChange={onChange} className="input" type="text" name={name} id={id} />
        </div>
    );
}
