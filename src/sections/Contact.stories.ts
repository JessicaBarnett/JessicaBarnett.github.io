import type { Meta, StoryObj } from '@storybook/react';

import '@styles/app.scss';
import ContactSection from './Contact.tsx';

const meta = {
  title: 'sections/Contact',
  component: ContactSection,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ContactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
