import React from 'react';
import './input.scss';

interface Props {
    name?: string;
    id?: string;
    className?: string;
    icon?: string;
}
export function Input({ name, id, className, icon }: Props): JSX.Element {
    return (
        <div className={`input-component ${className || ''}`}>
            {icon ? <span className="icon material-icons">{icon}</span> : null}
            <input className="input" type="text" name={name} id={id} />
        </div>
    );
}
