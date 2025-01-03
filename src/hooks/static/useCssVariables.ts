/**
 * Just gets data fromj @data/data.json and exports it in a uniform way
 */
import { useState } from 'react';
import { CssVariablesT } from "@src/types/css-variables-types.ts";
import * as json from '@data/css-variables.json' assert { type: 'json' };

export function useCssVariables() {
  const vars: CssVariablesT = json.default;
  const [value] = useState<CssVariablesT>(vars);
  return value;
}

