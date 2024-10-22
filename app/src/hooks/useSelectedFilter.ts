/**
 * Maintains a "selected" filter, determined by a dropdown.
 * Update requires only a string.
 * State required: useFilters
 */
import { useState } from "react";
import { TechTagFilterT } from "../types/types";

type UseSelectedFilterReturnT = [
  TechTagFilterT | undefined,
  (name: string) => void
];

/**
 * matches if the Filter itself or one of the Tags
 * has a name that matches the passed `name`
 */
const selectFilterByName = (filters: TechTagFilterT[], name: string): TechTagFilterT | undefined => {
  return (
    filters.find((filter: TechTagFilterT) => filter.name === name) ??
    filters.find((filter: TechTagFilterT) =>
      filter.tags.find((tag) => name === tag.name)
    )
  );
};

export function useSelectedFilter(filters: TechTagFilterT[]): UseSelectedFilterReturnT {
  const [value, setValue] = useState<TechTagFilterT | undefined>();

  function handleChange(name: string): void {
    setValue(selectFilterByName(filters, name));
  }

  return [value, handleChange];
}
