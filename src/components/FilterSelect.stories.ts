import type { Meta, StoryObj } from '@storybook/react';
import { filtersGen } from '../../data/generator.js';
import { FilterT } from '@src/types/data-types.ts';

import '@styles/components/filter-select.scss';
import FilterSelect from '@src/components/FilterSelect.tsx';

const filters: FilterT[] = filtersGen(3);

const meta = {
  title: 'components/FilterSelect',
  component: FilterSelect,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FilterSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: filters,
    selectedFilter: undefined,
    onFilterChange: () => { console.log('clicked') }
  }
};

