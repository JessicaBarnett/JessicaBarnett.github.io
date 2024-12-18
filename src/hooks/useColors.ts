/**
 * Just gets colors from a sass module, and returns it as a state hook.
 * Value is STATIC and can't be updated.
 */

import { useState } from 'react';
import variables from "@styles/variables.module.scss";

export function useColors() {
    const colors = variables.colors.split(',');
    const [colorsState] = useState<string[]>(colors);
    return [colorsState];
}
