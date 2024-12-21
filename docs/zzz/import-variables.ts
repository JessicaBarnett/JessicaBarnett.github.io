import variables from "@styles/variables.module.scss";

export type BreakpointsT = {
    miniBp: string;
    smallBp: string;
    mediumBp: string;
    wideBp: string;
    extraWideBp: string;
    hdBp: string;
  };

// needed to type reduce
type GenericMap = {
    [key:string]: string
};

// expects format: `key:val,key:val,key:val`
const formatListToMap = (colorListStr: string) => {
    const tuples = colorListStr.slice(1, -1) // remove trailing + leading quote
        .split(',') // split into array of strings -> ["colorName:#000000"]
        .map(color => color.split(':')) // split into array opf tuples -> [["colorName", "#000000"]]
    return tuples.reduce((result, color) => {
        const [name, hex] = color;
        result[name] = hex;
        return result;
        }, {} as GenericMap)
}

export const colorMap = formatListToMap(variables.colorMapStr);
export const colors = variables.colors.split(',');
export const breakpoints: BreakpointsT = {
    miniBp: variables.miniBp,
    smallBp: variables.smallBp,
    mediumBp: variables.mediumBp,
    wideBp: variables.wideBp,
    extraWideBp: variables.extraWideBp,
    hdBp: variables.hdBp,
}