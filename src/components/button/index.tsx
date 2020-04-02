import React from 'react';
import './button.scss';

interface PropsI {
    text: string;
    icon?: string;
    onClick?: () => void;
}
export function Button({ text, icon, onClick }: PropsI): JSX.Element {
    return (
        <button className="button-component" onClick={onClick}>
            {icon ? <span className="material-icons">{icon}</span> : null}
            {text}
        </button>
    );
}
