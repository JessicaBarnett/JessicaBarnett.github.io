/**
 * Just gets Project data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { ProjectT } from "@src/types/data-types.ts";
import { useData } from '@src/hooks/static/useData.ts';

export function useProjects() {
  const data = useData();
  const [value] = useState<ProjectT[]>(data.projects);
  return [value];
}

