import type { Meta, StoryObj } from '@storybook/react';

import ProjectTitle from './ProjectTitle.tsx';

const meta = {
  title: 'components/ProjectTitle',
  component: ProjectTitle,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ProjectTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
