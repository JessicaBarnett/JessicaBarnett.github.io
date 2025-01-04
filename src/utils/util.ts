import { FilterT } from "../types/data-types.ts";

// Util fns that I can't decide where to put

export const getFilterByName = (filters: FilterT[], filterName: string): FilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}
