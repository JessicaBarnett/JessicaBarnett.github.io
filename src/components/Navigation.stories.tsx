import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom'

import Navigation, { NavigationComponentProps } from './Navigation.tsx';

const meta = {
  title: 'components/Navigation',
  component: Navigation,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story></Story>
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof Navigation>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    onNavigation: () => console.log("navigation has occured"),
  } as NavigationComponentProps
};

