/**
 * Just gets Project data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { ProjectT } from "@src/types/data-types.ts";
import * as json from '@data/projects.json' assert { type: 'json' };

export function useProjects() {
  const data: { projects: ProjectT[] } = json;
  const [value] = useState<ProjectT[]>(data.projects);
  return [value];
}

