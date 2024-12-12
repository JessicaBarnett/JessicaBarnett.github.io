import { useState } from 'react';
import variables from "@styles/variables.module.scss";

export type BreakpointsT = {
  miniBp: string;
  smallBp: string;
  mediumBp: string;
  wideBp: string;
  extraWideBp: string;
  hdBp: string;
};

export function useBreakpoints() {
    const breakpoints: BreakpointsT = (() => {
        const tmp = { ...variables };
        delete tmp["colors"];
        return tmp as BreakpointsT;
        })();
    const [breakpointsState] = useState<BreakpointsT>(breakpoints);
    return [breakpointsState];
}

