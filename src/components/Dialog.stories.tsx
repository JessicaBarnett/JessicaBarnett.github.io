import type { Meta, StoryObj } from "@storybook/react";

import Dialog, { DialogComponentProps } from "./Dialog.tsx";
const meta = {
  title: "components/Dialog",
  component: Dialog,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>this is Dialog Content</p>,
    isOpen: true,
    onClose: () => console.log("dialog has been closed"),
  } as DialogComponentProps,
};
