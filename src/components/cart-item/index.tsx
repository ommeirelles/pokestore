import React from 'react';
import './cart-item.scss';

interface PropsI {
    img: string;
    quantity: string;
    price: string;
}
export function CartItem({ img, quantity, price }: PropsI): JSX.Element {
    return (
        <div className="cart-item-component">
            <img src={img} alt="pokemon" />
            <span className="qnty">{quantity}x</span>
            <span className="price">R${price}</span>
        </div>
    );
}
