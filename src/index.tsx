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

serviceWorker.register();

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
    deferredPrompt && deferredPrompt.prompt && deferredPrompt.prompt();
});
