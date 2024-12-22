import { useState } from 'react';
import { CssVariablesT } from '@src/types/css-variables-types';
import * as data from '@src/css-variables.json' assert { type: 'json' };

const cssVariables = data as CssVariablesT;

export function useRainbowColors() {
    const colors = cssVariables['colors'];

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
