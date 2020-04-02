import React from 'react';
import ReactDOM from 'react-dom';
import './styles/_index.scss';
import * as serviceWorker from './serviceWorker';
import { PokestoreProvider, CartProvider } from './context';
import { HomePage } from './pages/home';

export default function App(): JSX.Element {
    return (
        <CartProvider>
            <PokestoreProvider>
                <HomePage />
            </PokestoreProvider>
        </CartProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
