import type { Meta, StoryObj } from '@storybook/react';
import { experienceEntriesGen } from '../../data/generator.js';
const entries = experienceEntriesGen(4);

import ExperienceList from './ExperienceList.tsx';

const meta = {
  title: 'components/ExperienceList',
  component: ExperienceList,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ExperienceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    expEntries: entries
  }
};
