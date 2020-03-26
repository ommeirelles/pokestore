import React from 'react';
import './header.scss';
import { Input } from '../';

export function Header(): JSX.Element {
    return (
        <div className="header-component">
            <Input icon="search" name="search" id="search" />
        </div>
    );
}
