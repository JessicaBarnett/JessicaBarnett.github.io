import type { Meta, StoryObj } from '@storybook/react';

import SocialSidebar from './SocialSidebar.tsx';

const meta = {
  title: 'components/SocialSidebar',
  component: SocialSidebar,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SocialSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
