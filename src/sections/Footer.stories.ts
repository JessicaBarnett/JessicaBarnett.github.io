import type { Meta, StoryObj } from '@storybook/react';

import FooterSection from './Footer.tsx';

const meta = {
  title: 'sections/Footer',
  component: FooterSection,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
