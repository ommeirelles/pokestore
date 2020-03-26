import React, { useEffect } from 'react';

import './App.scss';
import { Header } from './components';
import { PokestoreProvider, usePokestore, PokeStoreActions } from './context';
import { PokeService } from './services';

function AppLayout(): JSX.Element {
    const [, dispatch] = usePokestore();

    useEffect(() => {
        PokeService.getTypes().then(({ results: typesPayload }) => {
            dispatch({
                type: PokeStoreActions.LOAD_TYPES,
                payload: typesPayload,
            });
        });
        // const doc = document.documentElement;
        //     doc.style.setProperty('--app-main-color', 'blue');
    }, []);

    return <Header />;
}

export default function App(): JSX.Element {
    return (
        <PokestoreProvider>
            <AppLayout />
        </PokestoreProvider>
    );
}
