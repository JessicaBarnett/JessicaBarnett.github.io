export type CssColorsT = {
    blue: string
    green: string
    yellow: string
    orange: string
    pink: string
    black: string
    white: string
};
export type CssBreakpointsT = {
    miniBp: string
    smallBp: string
    mediumBp: string
    wideBp: string
    extraWideBp: string
    hdBp: string
};
export type CssRainbowT = {
    lineWidthXsm: string
    lineWidthSm: string
    lineWidthMed: string
    lineWidthLg: string
};
export type CssVariablesT = {
    colors: CssColorsT;
    breakpoints: CssBreakpointsT;
    rainbow: CssRainbowT;
};