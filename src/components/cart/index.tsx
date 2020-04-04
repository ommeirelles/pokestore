import React from 'react';
import './cart.scss';
import { useCartstore } from '../../context';
import { Button } from '../button';
import { CartItem } from '../cart-item';
export function Cart(): JSX.Element {
    const [{ items = [] }] = useCartstore();
    return (
        <div className="cart-component">
            <div className="items">
                {Object.entries(items).map(([, { quantity: q, pokemon: p }], i) => (
                    <CartItem key={i} quantity={q.toString()} price={p.price.toString()} img={p.sprites.back_default} />
                ))}
            </div>
            <Button text="Finalizar" icon="done_all" disabled={!(items && Object.keys(items).length > 0) || false} />
        </div>
    );
}
