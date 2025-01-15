import { ProjectT, TagT, ExperienceEntryT, FilterT, MediaT } from '../src/types/data-types.ts';

const random = (max = 5) => Math.floor(Math.random() * max);

const multiGen = <T>(fn: (idx: number) => T, numItems: number): T[] => {
    numItems = numItems !== null ? numItems : random();
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


export const mediaGen = (idx = random()): MediaT => {
    const demoImageUrls = ['/assets/docs/demo/pink-800-1000.jpg', '/assets/docs/demo/orange-800-1000.jpg', '/assets/docs/demo/yellow-800-1000.jpg', '/assets/docs/demo/green-800-1000.jpg', '/assets/docs/demo/blue-800-1000.jpg']

    return {
        id: `media-${idx}`,
        name: `image #${idx}`,
        url: demoImageUrls[idx % demoImageUrls.length],
        alt: `image #${idx}`,
        type: 'image'
    }
};
export const mediasGen = (num = random()): MediaT[] => multiGen(mediaGen, num);


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
        id: 'job-${idx}',
        title: `Job Title ${idx}`,
        company: "Company Name",
        start: "20XX",
        end: "20XX",
        tags: tagsGen()
    }
}
export const experienceEntriesGen = (num = random()): ExperienceEntryT[] => multiGen(experienceEntryGen, num);


export const filterGen = (idx = random()): FilterT => {
    return {
        displayName: `Tag ${idx}`,
        name: `tag-${idx}`,
        tags: tagsGen()
    }
};
export const filtersGen = (num = random()): FilterT[] => multiGen(filterGen, num);
