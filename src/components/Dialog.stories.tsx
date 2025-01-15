import type { Meta, StoryObj } from "@storybook/react";
import { paragraphsGen } from '@data/generator.js';
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
    children: <p>Duis molestie eros sit amet eros porta, id accumsan justo lobortis. Mauris laoreet maximus ex, interdum dictum est volutpat vitae. Fusce cursus ipsum ac erat luctus tincidunt. Nam egestas tortor orci. Aenean in lacinia felis. Donec ut lectus elementum, blandit leo a, ultricies ligula. Maecenas id nunc accumsan, tempor ligula nec, consequat sapien.</p>,
    isOpen: true,
    onClose: () => console.log("dialog has been closed"),
  } as DialogComponentProps,
};
