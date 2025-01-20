import type { Meta, StoryObj } from "@storybook/react";
import StackTable, {StackTableComponentProps} from "./StackTable.tsx";

const stackData = [
  ['Framework', 'Ruby on Rails'],
  ['Server Language', 'Ruby'],
  ['Templates', 'Haml'],
  ['CSS preprossor', 'SCSS'],
  ['Javascript Tools', 'JQuery, JQueryUi, LoDash, SlickSlider'],
  ['Database', 'MongoDb']
];

const meta = {
  title: "components/StackTable",
  component: StackTable,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StackTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: stackData
  } as StackTableComponentProps,
};
