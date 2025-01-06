import type { Meta, StoryObj } from '@storybook/react';

import Navigation from './Navigation.tsx';

const meta = {
  title: 'components/Navigation',
  component: Navigation,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
