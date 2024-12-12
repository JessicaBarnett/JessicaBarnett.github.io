import { useState } from 'react';
import variables from "@styles/variables.module.scss";

export function useColors() {
    const colors = variables.colors.split(',');
    const [colorsState] = useState<string[]>(colors);
    return [colorsState];
}
