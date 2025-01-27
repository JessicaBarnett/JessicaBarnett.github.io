export type ViewportT = "mobile" | "wide";

export type MediaT = {
    id: string,
    name?: string,
    url: string,
    alt: string,
    viewport: ViewportT
}

export type ContentT = {
    heading: string,
    paragraphs: string[]
}

export type TableRowT = {
    heading: string,
    value: string
}

export type TagT = {
    displayName?: string,
    name: string
};

export type ProjectT = {
    id: string,
    listTitle: string,
    description: string,
    company: string,
    tags: TagT[],
};

export type ProjectDetailsT = ProjectT & {
    title: string,
    subtitle?: string,
    role: string,
    time: string,
    type: string,
    media: MediaT[],
    table: TableRowT[]
    content: ContentT[]
}

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
