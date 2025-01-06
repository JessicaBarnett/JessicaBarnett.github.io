import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ContactForm from './ContactForm.tsx';

const meta = {
  title: 'components/ContactForm',
  component: ContactForm,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
