/**
 * Just gets Project data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { ProjectT } from "@src/types/data-types";
import * as data from '@data/data.json' assert { type: 'json' };

export function useProjects() {
  const [value] = useState<ProjectT[]>(data.projects);
  console.log('initing useProjects'); // TODO why is this initing so much????  should be 1 and done...
  return [value];
}

