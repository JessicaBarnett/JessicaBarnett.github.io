/**
 * Just gets Filter data from json and returns it as a state hook.
 * List is STATIC and can't be updated.
 */
import { useState } from 'react';
import { ExperienceEntryT } from "@src/types/data-types.ts";
import { useData } from '@src/hooks/static/useData.ts';

export function useExperienceEntries() {
  const data = useData();
  const [value] = useState<ExperienceEntryT[]>(data.experience);
  return [value];
}

