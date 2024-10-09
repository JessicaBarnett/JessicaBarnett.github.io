export type TechTagT = {
    displayName: string,
    name: string
};

export type ProjectT = {
    id: string,
    title: string,
    description: string,
    company: string,
    tags: TechTagT[]
};

export type TechTagFilterT = {
    displayName: string,
    name: string,
    tags: string[]
};
