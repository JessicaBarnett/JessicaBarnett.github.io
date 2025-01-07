/**
 * Maintains a "selected" filter, determined by a dropdown.
 * Update requires only a string.
 * State required: useFilters
 */
import { useState } from "react";
import { FilterT, TagT } from "@src/types/data-types.ts";

type UseSelectedFilterReturnT = [
  FilterT | undefined | null,
  ((tag: TagT ) => void) & ((tagName: string ) => void)
];

/**
 * matches if the Filter itself or one of the Tags
 * has a name that matches the passed `name`
 */
const matchFilterByName = (filters: FilterT[], name: string): FilterT | undefined => {
  return (
    filters.find((filter: FilterT) => filter.name === name) ??
    filters.find((filter: FilterT) =>
      filter.tags.find((tag) => name === tag.name)
    )
  );
};

export function useSelectedFilter(filters: FilterT[], initial?: FilterT): UseSelectedFilterReturnT {
  const [value, setValue] = useState<FilterT | undefined | null>();
  if (initial) {
    setValue(initial);
  }

  function handleChange(tagName: string): void;
  function handleChange(tag: TagT): void;
  function handleChange(newValue: TagT | string): void {
    const tagName = typeof newValue === 'string' ? newValue : newValue.name;
    const matchingFilter = matchFilterByName(filters, tagName);
    if (matchingFilter?.name === value?.name) {
      setValue(null);
    } else {
      setValue(matchFilterByName(filters, tagName));
    }
  }

  return [value, handleChange];
}
