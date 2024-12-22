/**
 * Just gets Filter data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */
import { useState } from 'react';
import { ExperienceEntryT } from "@src/types/data-types";
import * as data from '@data/data.json' assert { type: 'json' };

export function useExperienceEntries() {
  const [value] = useState<ExperienceEntryT[]>(data.experience);
  return [value];
}

