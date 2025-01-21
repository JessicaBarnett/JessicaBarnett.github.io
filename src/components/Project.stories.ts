import type { Meta, StoryObj } from '@storybook/react';
import { projectGen } from '@data/generator.js';

import Project from './Project.tsx';
import { TagT } from '@src/types/data-types.ts';

const projectData = projectGen(1);

const meta = {
  title: 'components/Project',
  component: Project,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Project>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: projectData,
    selectedTags: [],
    onTagSelect: (tag: TagT) => { console.log(`Tag "${tag.displayName}" selected`) },
  }
};
