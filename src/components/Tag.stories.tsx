import type { Meta, StoryObj } from '@storybook/react';
import { tagGen } from '@data/generator.js';

import '@styles/elements/_buttons.scss';
import Tag from '@src/components/Tag.tsx';

const tagData = tagGen(1);

const meta = {
  title: 'components/Tag',
  component: Tag,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: tagData,
    isSelected: false,
    onClick: () => { console.log('clicked') }
  }
};

export const Selected: Story = {
    args: {
      tag: tagData,
      isSelected: true,
      onClick: () => { console.log('clicked') }
    }
};
