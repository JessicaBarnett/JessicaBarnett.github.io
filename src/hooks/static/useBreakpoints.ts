/**
 * Just gets breakpoints from a sass module, and returns it as a state hook.
 * Value is STATIC and can't be updated.
 */

import { useState } from 'react';
import { CssVariablesT } from '@src/types/css-variables-types';
import * as data from '@src/css-variables.json' assert { type: 'json' };;

const cssVariables = data as CssVariablesT;

export function useBreakpoints() {
    const [breakpointsState] = useState(cssVariables.breakpoints);
    return [breakpointsState];
}

