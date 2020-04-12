import React, { useState } from 'react';
import './cart.scss';
import { useCartstore, RemovePokemonFromStoreAction, getTotalStore, ClearCart } from '../../context';
import { Button } from '../button';
import { CartItem } from '../cart-item';
import { PokemonI } from '../../services/types';
import { Success } from '../popup';

export function Cart({
    className = '',
    checkout = (): void => undefined,
}: {
    className?: string;
    checkout: () => void;
}): JSX.Element {
    const [{ items = [] }, dispatch] = useCartstore();
    const [modal, setModal] = useState(false);

    const onDelete = (p: PokemonI) => (): void => {
        dispatch(RemovePokemonFromStoreAction(p));
    };

    const show = (): void => {
        if (!modal) {
            checkout();
            dispatch(ClearCart());
        }
        setModal(!modal);
    };

    return (
        <div className={`cart-component ${className}`}>
            {modal ? <Success close={show} /> : null}
            <div className="items">
                {Object.entries(items).map(([, { quantity: q, pokemon: p }], i) => (
                    <CartItem
                        key={i}
                        quantity={q.toString()}
                        price={p.price.toString()}
                        img={p.sprites.back_default || p.sprites.front_default}
                        onDelete={onDelete(p)}
                    />
                ))}
            </div>
            <p className="total">Total: P$ {getTotalStore({ items })}</p>
            <Button
                onClick={show}
                text="Finalizar"
                icon="done_all"
                disabled={!(items && Object.keys(items).length > 0) || false}
            />
        </div>
    );
}
