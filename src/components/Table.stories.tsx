import type { Meta, StoryObj } from "@storybook/react";
import Table, {TableComponentProps} from "./Table.tsx";
import { TableRowT } from "@src/types/data-types.ts";

const data: TableRowT[] = [
  { "heading": "framework", "value": "Ruby on Rails" },
  { "heading": "Server Language", "value": "Ruby" },
  { "heading": "Templates", "value": "Haml" },
  { "heading": "CSS Preprocessor", "value": "Scss" },
  {
    "heading": "Javascript",
    "value": "JQuery, JQueryUi, LoDash, SlickSlider"
  },
  { "heading": "Database", "value": "MongoDb" }
];

const meta = {
  title: "components/Table",
  component: Table,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: data
  } as TableComponentProps,
};
