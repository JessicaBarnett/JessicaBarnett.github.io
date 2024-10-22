/**
 * Just gets Project data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */

import { useState } from 'react';
import { ProjectT } from "../types/types";
import * as data from '../../data/data.json';

export function useProjects() {
  const [value] = useState<ProjectT[]>(data.projects);
  console.log('initing useProjects');
  return [value];
}

