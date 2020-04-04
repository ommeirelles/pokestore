import { Theme } from './types';

class Theming {
    private knownTypesThemes: { [key: string]: Theme } = {
        bug: {
            mainColor: '#aabb22',
            secondColor: '#000000',
        },
        dark: {
            mainColor: '#775544',
            secondColor: '#FFFFFF',
        },
        dragon: {
            mainColor: '#7766ee',
            secondColor: '#000000',
        },
        electric: {
            mainColor: '#ffcc33',
            secondColor: '#000000',
        },
        fairy: {
            mainColor: '#ee99ee',
            secondColor: '#000000',
        },
        fighting: {
            mainColor: '#bb5544',
            secondColor: '#FFFFFF',
        },
        fire: {
            mainColor: '#ff4422',
            secondColor: '#000000',
        },
        flying: {
            mainColor: '#8899ff',
            secondColor: '#000000',
        },
        ghost: {
            mainColor: '#6666bb',
            secondColor: '#FFFFFF',
        },
        grass: {
            mainColor: '#77cc55',
            secondColor: '#000000',
        },
        ground: {
            mainColor: '#ddbb55',
            secondColor: '#000000',
        },
        ice: {
            mainColor: '#66ccff',
            secondColor: '#000000',
        },
        normal: {
            mainColor: '#aaaa99',
            secondColor: '#000000',
        },
        poison: {
            mainColor: '#aa5599',
            secondColor: '#000000',
        },
        psychic: {
            mainColor: '#ff5599',
            secondColor: '#000000',
        },
        rock: {
            mainColor: '#bbaa66',
            secondColor: '#000000',
        },
        steel: {
            mainColor: '#aaaabb',
            secondColor: '#000000',
        },
        water: {
            mainColor: '#3399ff',
            secondColor: '#000000',
        },
        default: {
            mainColor: '#2f2f2f',
            secondColor: '#ffffff',
        },
        // unknown: '',
        // shadow: '',
    };

    hexToRgb(hex: string): string {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '';
    }

    changeThemeVariables(type: string): void {
        const theme = this.knownTypesThemes[type] || this.knownTypesThemes['default'];
        const doc = document.documentElement;
        doc.style.setProperty('--app-main-color', theme.mainColor);
        doc.style.setProperty('--app-main-color-rgb', this.hexToRgb(theme.mainColor));
        doc.style.setProperty('--app-second-color-rgb', this.hexToRgb(theme.secondColor));
        doc.style.setProperty('--app-second-color', theme.secondColor);
    }
}

export const service = new Theming();
