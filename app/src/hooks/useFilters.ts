/**
 * Just gets Filter data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { TechTagFilterT } from "../types/types";
import * as data from '../../data/data.json'; // TODO: improve this?

export function useFilters() {
  const [value] = useState<TechTagFilterT[]>(data.techTagFilters);
  console.log('initing useFilters');
  return [value];
}

