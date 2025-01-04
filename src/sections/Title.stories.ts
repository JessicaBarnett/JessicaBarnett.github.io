import type { Meta, StoryObj } from '@storybook/react';

import '@styles/app.scss';
import Title from './Title.tsx';

const meta = {
  title: 'sections/Title',
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
