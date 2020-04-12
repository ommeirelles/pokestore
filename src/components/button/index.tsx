import React from 'react';
import './button.scss';

interface PropsI {
    text?: string;
    className?: string;
    icon?: string;
    onClick?: () => void;
    disabled?: boolean;
    children?: JSX.Element | string;
}
export function Button({ text = '', icon, onClick, disabled = false, className = '', children }: PropsI): JSX.Element {
    return (
        <button className={`button-component ${className}`} onClick={onClick} disabled={disabled}>
            {icon ? <span className="material-icons">{icon}</span> : null}
            {text || children}
        </button>
    );
}
