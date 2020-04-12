import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './popup.scss';
import { Button } from '../button';

interface PropsI {
    children: JSX.Element | JSX.Element[] | string;
    close?: () => void;
    className: string;
}

export function Popup({ children, close = (): void => undefined, className = '' }: PropsI): JSX.Element {
    const elRoot = document.getElementById('portals');
    const el = document.createElement('div');

    useEffect(() => {
        elRoot?.appendChild(el);
        return (): void => {
            elRoot?.removeChild(el);
        };
    }, [el, elRoot]);

    return createPortal(
        <div className="wrapper-popup-component" onClick={close}>
            <div className={`content ${className}`}>{children}</div>
            <Button onClick={close}>Fechar</Button>
        </div>,
        el,
    );
}
