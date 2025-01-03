import { useState } from 'react';
import { useCssVariables } from '@src/hooks/static/useCssVariables.ts';

export function useRainbowColors() {
    const cssVariables = useCssVariables();
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
