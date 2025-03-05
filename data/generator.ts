import { ProjectT, TagT, ExperienceEntryT, FilterT, MediaT, ViewportT } from '../src/types/data-types.ts';

// random positive integer between max and min
export const random = (max=10, min=1) => Math.floor(Math.random() * (max - min) + min);

// return a random item from an array
export const randomGen = <T>(collection: T[]): T => collection[random(demoWords.length - 1)]

// return an array of items using the generator fn passed in
export const multiGen = <T>(fn: (idx: number) => T, numItems: number): T[] => {
    numItems = numItems !== null ? numItems : random();
    const items: T[] = [];
    for (let idx = 0; idx <= numItems; idx++) {
        const item = fn(idx);
        items.push(item)
    }
    return items;
};

const viewports: ViewportT[] = ['wide', 'mobile']
export const viewport = () => randomGen(viewports);

export const demoImageUrls = ['/docs/demo/pink-1080x1000.jpg', '/docs/demo/orange-1080x1000.jpg', '/docs/demo/yellow-1080x1000.jpg', '/docs/demo/green-1080x1000.jpg', '/docs/demo/blue-1080x1000.jpg', '/docs/demo/pink-800x1600.jpg', '/docs/demo/orange-800x1600.jpg', '/docs/demo/yellow-800x1600.jpg', '/docs/demo/green-800x1600.jpg', '/docs/demo/blue-800x1600.jpg']
export const imageUrl = (num = random(demoImageUrls.length)) => demoImageUrls[num];
export const imageUrls = (num = random(demoImageUrls.length)) => [...demoImageUrls].slice(0, num);

const demoWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
export const wordGen = () => randomGen(demoWords);
export const wordsGen = (num = random(10, 5)): string => multiGen(wordGen, num).join(' ');
export const sentenceGen = (): string => [wordsGen(), '.  '].join('');
export const sentencesGen = (num = random(5)): string => multiGen(sentenceGen, num).join(' ');
export const paragraphGen = (): string => [sentencesGen(), '\n'].join(' ');
export const paragraphsGen = (num = random(5)): string => multiGen(paragraphGen, num).join(' ');

export const tagGen = (idx = random()): TagT => {
    return {
        displayName: `Tag ${idx}`,
        name: `tag-${idx}`
    }
};
export const tagsGen = (num = random()): TagT[] => multiGen(tagGen, num);


export const mediaGen = (idx = random()): MediaT => {
    return {
        id: `media-${idx}`,
        name: `image #${idx}`,
        url: imageUrl(idx),
        alt: `image #${idx}`,
        viewport: viewport()
    }
};
export const mediasGen = (num = random()): MediaT[] => multiGen(mediaGen, num);


export const projectGen = (idx = random()): ProjectT => {
    return {
        id: `zz-00${idx}`,
        listTitle: "Project Title",
        description: "Worked on this, that and the other, and this thing and that thing and stuff and things.",
        company: "Company Name",
        tags: tagsGen(),
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
