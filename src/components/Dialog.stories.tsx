import type { Meta, StoryObj } from "@storybook/react";
import { paragraphsGen } from '@data/generator.js';
import Dialog, { DialogComponentProps } from "./Dialog.tsx";

const meta = {
  title: "components/Dialog",
  component: Dialog,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{position: 'relative', minHeight: '400px'}}>
        <Story></Story>
      </div>
    )
  ]
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>{paragraphsGen(3)}</p>,
    isOpen: true,
    onClose: () => console.log("dialog has been closed"),
  } as DialogComponentProps,
};
