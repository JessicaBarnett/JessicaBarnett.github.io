import type { Meta, StoryObj } from '@storybook/react';
import { projectsGen, filtersGen } from '../../data/generator.js';
import { FilterT } from '@src/types/data-types.ts';
import { ProjectsByCompanyT } from "@src/hooks/useFilteredProjects.ts";

import Projects from '@src/sections/Projects.tsx';


const filters: FilterT[] = filtersGen(3);
const filteredProjectsByCompany = {
    "Weblinc Ecommerce":  projectsGen(4),
    "Relay Network":  projectsGen(4)
} as unknown as ProjectsByCompanyT;

const meta = {
  title: 'sections/Projects',
  component: Projects,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filteredProjects: filteredProjectsByCompany,
    selectedFilter: undefined,
    filters: filters,
    onFilterChange: () => console.log('filter changed.')
  }
};
