import React from 'react';
import './button.scss';

interface PropsI {
    text: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
}
export function Button({ text, icon, onClick, disabled = false }: PropsI): JSX.Element {
    return (
        <button className="button-component" onClick={onClick} disabled={disabled}>
            {icon ? <span className="material-icons">{icon}</span> : null}
            {text}
        </button>
    );
}
