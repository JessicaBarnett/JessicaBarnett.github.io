import type { Meta, StoryObj } from '@storybook/react';
import { experienceEntriesGen } from '../../data/generator.js';
const entries = experienceEntriesGen(4);

import Experience from '@src/sections/Experience.tsx';

const meta = {
  title: 'sections/Experience',
  component: Experience,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    expEntries: entries
  }
};
