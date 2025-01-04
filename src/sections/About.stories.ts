import type { Meta, StoryObj } from '@storybook/react';

import AboutSection from '@src/sections/About.tsx';

const meta = {
  title: 'sections/About',
  component: AboutSection,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
