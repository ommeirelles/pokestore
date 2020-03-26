import React, { useEffect } from 'react';
import './App.scss';

// import PokemonService from './services/pokemon';
import { Header } from './components';

function App() {
    const doc = document.documentElement;
    useEffect(() => {
        doc.style.setProperty('--app-main-color', 'blue');
        // PokemonService.getPokemonList(0, 999).then(console.info);
        // PokemonService.getTypes().then(t => console.info(t.results.reduce((a, i) => [i.name].concat(a), [])));
    });

    return <Header />;
}

export default App;
