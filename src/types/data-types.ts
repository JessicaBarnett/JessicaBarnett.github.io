export type MediaT = {
    id: string,
    name?: string,
    url: string,
    alt: string,
}

export type TagT = {
    displayName?: string,
    name: string
};

export type ProjectT = {
    id: string,
    title: string,
    description: string,
    company: string,
    tags: TagT[],
    detailed_description?: string,
    media?: MediaT[],
};

export type FilterT = {
    displayName: string,
    name: string,
    tags: TagT[]
};

export type ExperienceEntryT = {
    id: string,
    title: string,
    company: string,
    start: string,
    end: string,
    tags: TagT[]
};

export type DataT = {
    filters: FilterT[],
    projects: ProjectT[],
    experience: ExperienceEntryT[]
}
