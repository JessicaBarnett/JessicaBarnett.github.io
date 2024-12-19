import type { Meta, StoryObj } from '@storybook/react';
import { projectsGen, tagsGen } from '../../data/generator.js';

import ProjectList from '../components/ProjectList';

const projects = projectsGen(10);
const selectedTags = tagsGen(1);

const meta = {
  title: 'components/ProjectList',
  component: ProjectList,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Company Name",
    projects: projects,
    selectedTags: selectedTags,
    onTagSelect: (name: string) => { console.log(`tag selected: ${name}`) }
  }
};
