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
};

export type FilterT = {
    displayName: string,
    name: string,
    tags: TagT[]
};

export type ExperienceEntryT = {
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
