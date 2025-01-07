import type { Meta, StoryObj } from '@storybook/react';

import ContactForm, { FormEventT } from "./ContactForm.tsx";
const meta = {
  title: 'components/ContactForm',
  component: ContactForm,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFormStateChange: (formState: FormEventT) => { console.log(formState) }
  }
};
