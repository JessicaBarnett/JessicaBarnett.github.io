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
        <div className="sb-content" style={{height: '100vh', width: '100%', backgroundColor: 'dodgerBlue'}}>
          <p>
            This is content that's covered up by the dialog!
          </p>
        </div>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p style={{ padding: '5vh 5rem', border: '2px solid black' }}>{paragraphsGen(10)}</p>,
    isOpen: true,
    onClose: () => console.log("drawer has been closed"),
    scroll: 'y'
  } as DialogComponentProps,
};
