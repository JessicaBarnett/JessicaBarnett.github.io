/**
 * Just gets breakpoints from a sass module, and returns it as a state hook.
 * Value is STATIC and can't be updated.
 */

import { useState } from 'react';
import * as sharedVars from '../css-variables.json';

export type BreakpointsT = {
    miniBp: string;
    smallBp: string;
    mediumBp: string;
    wideBp: string;
    extraWideBp: string;
    hdBp: string;
  };

export function useBreakpoints() {

    const [breakpointsState] = useState<BreakpointsT>(sharedVars.breakpoints as BreakpointsT);
    return [breakpointsState];
}

