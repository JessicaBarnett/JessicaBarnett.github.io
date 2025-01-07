import type { Meta, StoryObj } from '@storybook/react';

import Title from './TitleSection.tsx';

const meta = {
  title: 'components/TitleSection',
  component: Title,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
