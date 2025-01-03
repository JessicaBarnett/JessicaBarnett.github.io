/**
 * Just gets data fromj @data/data.json and exports it in a uniform way
 */
import { useState } from 'react';
import { DataT } from "@src/types/data-types.ts";
import * as json from '@data/data.json' assert { type: 'json' };

export function useData() {
  const data: DataT = json.default;
  const [value] = useState<DataT>(data);
  return value;
}

