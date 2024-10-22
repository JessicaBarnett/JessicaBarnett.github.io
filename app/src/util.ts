import { ProjectT, TechTagFilterT, TechTagT } from "./types/types";

// Util fns that I can't decide where to put

export const getFilterByName = (filters: TechTagFilterT[], filterName: string): TechTagFilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}
