import React from 'react';
import './cart-item.scss';
import { Button } from '../button';

interface PropsI {
    img: string;
    quantity: string;
    price: string;
    onDelete?: () => void;
}
export function CartItem({ img, quantity, price, onDelete }: PropsI): JSX.Element {
    return (
        <div className="cart-item-component">
            <img src={img} alt="pokemon" />
            <Button icon="delete_outline" className="delete-button" onClick={onDelete} />
            <span className="qnty">{quantity}x</span>
            <span className="price">R${price}</span>
        </div>
    );
}
