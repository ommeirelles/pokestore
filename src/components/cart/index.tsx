import React from 'react';
import './cart.scss';
import { useCartstore, RemovePokemonFromStoreAction, getTotalStore } from '../../context';
import { Button } from '../button';
import { CartItem } from '../cart-item';
import { PokemonI } from '../../services/types';

export function Cart({ className = '' }: { className?: string }): JSX.Element {
    const [{ items = [] }, dispatch] = useCartstore();

    const onDelete = (p: PokemonI) => (): void => {
        dispatch(RemovePokemonFromStoreAction(p));
    };

    return (
        <div className={`cart-component ${className}`}>
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
            <Button text="Finalizar" icon="done_all" disabled={!(items && Object.keys(items).length > 0) || false} />
        </div>
    );
}
