import { ProjectT, TagT, ExperienceEntryT } from '../src/types/data-types';

const random = (max = 10) => Math.floor(Math.random() * max);

const multiGen = <T>(fn: (idx: number) => T, numItems: number): T[] => {
    numItems = numItems !== null ? numItems : random(10);
    const items: T[] = [];
    for (let idx = 0; idx <= numItems; idx++) {
        const item = fn(idx);
        items.push(item)
    }
    return items;
};

export const tagGen = (idx = random()): TagT => {
    return {
        displayName: `Tag ${idx}`,
        name: `tag-${idx}`
    }
};
export const tagsGen = (num = random()): TagT[] => multiGen(tagGen, num);

export const projectGen = (idx = random()): ProjectT => {
    return {
        id: `zz-00${idx}`,
        title: "Project Title",
        description: "Worked on this, that and the other, and this thing and that thing and stuff and things.",
        company: "Company Name",
        tags: tagsGen()
      };
}
export const projectsGen = (num = random()): ProjectT[] => multiGen(projectGen, num);


export const experienceEntryGen = (idx = random()): ExperienceEntryT => {
    return {
        title: `Job Title ${idx}`,
        company: "Company Name",
        start: "20XX",
        end: "20XX",
        tags: tagsGen()
    }
}
export const experienceEntrysGen = (num = random()): ExperienceEntryT[] => multiGen(experienceEntryGen, num);
