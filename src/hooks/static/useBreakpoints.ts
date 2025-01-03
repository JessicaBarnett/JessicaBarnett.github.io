/**
 * Just gets breakpoints from a sass module, and returns it as a state hook.
 * Value is STATIC and can't be updated.
 */

import { useState } from 'react';
import { useCssVariables } from '@src/hooks/static/useCssVariables.ts';

export function useBreakpoints() {
    const cssVariables = useCssVariables();
    const [breakpointsState] = useState(cssVariables.breakpoints);
    return [breakpointsState];
}

