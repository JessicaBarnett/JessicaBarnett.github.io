import { useState } from 'react';
import * as sharedVars from '../css-variables.json';

export type ColorsT = { [key: string]: string };

export function useRainbowColors() {
    const colors = sharedVars['colors'];

    // defines the order in which that colors will appear in rainbow stripes
    const rainbowColors = [
        colors.blue,
        colors.green,
        colors.yellow,
        colors.orange,
        colors.pink
    ];

    const [rainbowColorsState] = useState<string[]>(rainbowColors);
    return [rainbowColorsState];
}
