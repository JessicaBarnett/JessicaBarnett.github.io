import { FilterT, TagT } from "../types/data-types.ts";

// Util fns that I can't decide where to put
export const getFilterByName = (filters: FilterT[], filterName: string): FilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}

export const tagSelected = (tag: TagT, selectedTags: TagT[]): boolean => {
    return !!selectedTags.find(selTag => selTag.name === tag.name);
}

// Polyfill for Object.groupBy
export const groupBy = <T>(collection: T[], key: string | ((val: T) => string)) => {
    const keyFn = typeof key === 'string' ? () => key : key;
    const result: { [key: string]: T[] } = {};
    return collection.reduce((result,  value) => {
        if (result[keyFn(value)]) {
            result[keyFn(value)].push(value);
        } else {
            result[keyFn(value)] = [value]
        }
        return result;
    }, result)
}

// this is a function which returning a promise in the requested time
export const wait = (time: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
}

export const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    let scrollToElement = id ? document.getElementById(id) : null;
    if (scrollToElement !== null) {
        window.scrollTo({
            top: scrollToElement.offsetTop - 55,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        setTimeout(() => {
            scrollToElement = document.getElementById(id);
            if (scrollToElement !== null) {
                window.scrollTo({
                    top: scrollToElement.offsetTop - 55,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 50)
    }
  }