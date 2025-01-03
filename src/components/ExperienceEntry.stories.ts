import type { Meta, StoryObj } from '@storybook/react';
import { experienceEntryGen } from '../../data/generator.js';

import ExperienceEntry from '../components/ExperienceEntry.tsx';

const experienceEntry = experienceEntryGen(1);

const meta = {
  title: 'components/ExperienceEntry',
  component: ExperienceEntry,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: { },
} satisfies Meta<typeof ExperienceEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entry: experienceEntry
  }
};
