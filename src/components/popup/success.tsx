import React from 'react';
import { Popup } from './popup';
import './success.scss';

export function Success({ close }: { close: () => void }): JSX.Element {
    return (
        <Popup close={close} className="success-popup-component">
            <span className="material-icons">done_outline</span>
            <p>
                Parabéns, sua compra foi efetuada com sucesso!
                <br />
                Em até 10 dias uteis estara na tua casa.
            </p>
        </Popup>
    );
}
