import type { Meta, StoryObj } from '@storybook/react';
import { experienceEntryGen } from '../../data/generator.js';

import ExperienceEntry from './ExperienceEntry.tsx';
import { TagT } from '@src/types/data-types.ts';

const experienceEntry = experienceEntryGen(1);

const meta = {
  title: 'components/ExperienceEntry',
  component: ExperienceEntry,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExperienceEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entry: experienceEntry,
    selectedTags: [],
    onTagSelect: (tag: TagT) => { console.log(`Tag "${tag.displayName}" selected`) }
  }
};
