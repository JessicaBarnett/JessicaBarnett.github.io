import { FilterT, TagT } from "../types/data-types.ts";

// Util fns that I can't decide where to put

export const getFilterByName = (filters: FilterT[], filterName: string): FilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}

export const tagSelected = (tag: TagT, selectedTags: TagT[]): boolean => {
    return !!selectedTags.find(selTag => selTag.name === tag.name);
}