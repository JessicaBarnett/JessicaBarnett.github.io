/**
 * Just gets Filter data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { FilterT } from "../types/types";
import * as data from '../../data/data.json'; // TODO: improve this?

export function useFilters() {
  const [value] = useState<FilterT[]>(data.filters);
  return [value];
}

