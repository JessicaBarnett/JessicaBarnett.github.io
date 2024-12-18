/**
 * Maintains a "selected" filter, determined by a dropdown.
 * Update requires only a string.
 * State required: useFilters
 */
import { useState } from "react";
import { FilterT } from "../types/types";

type UseSelectedFilterReturnT = [
  FilterT | undefined,
  (name: string) => void
];

/**
 * matches if the Filter itself or one of the Tags
 * has a name that matches the passed `name`
 */
const selectFilterByName = (filters: FilterT[], name: string): FilterT | undefined => {
  return (
    filters.find((filter: FilterT) => filter.name === name) ??
    filters.find((filter: FilterT) =>
      filter.tags.find((tag) => name === tag.name)
    )
  );
};

export function useSelectedFilter(filters: FilterT[]): UseSelectedFilterReturnT {
  const [value, setValue] = useState<FilterT | undefined>();

  function handleChange(name: string): void {
    setValue(selectFilterByName(filters, name));
  }

  return [value, handleChange];
}
