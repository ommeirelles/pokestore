import React from 'react';
import './button.scss';

interface PropsI {
    text: string;
    icon?: string;
}
export function Button({ text, icon }: PropsI): JSX.Element {
    return (
        <button className="button-component">
            {icon ? <span className="material-icons">{icon}</span> : null}
            {text}
        </button>
    );
}
