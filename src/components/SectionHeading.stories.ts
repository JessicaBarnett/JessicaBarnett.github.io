import type { Meta, StoryObj } from '@storybook/react';

import SectionHeading from './SectionHeading.tsx';

const meta = {
  title: 'components/SectionHeading',
  component: SectionHeading,
  parameters: {
    titleText: "Section Title"
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Section Title"
  }
};
