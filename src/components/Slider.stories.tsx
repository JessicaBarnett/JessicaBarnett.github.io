import type { Meta, StoryObj } from "@storybook/react";
import { mediasGen } from '@data/generator.js';
import Slider, {SliderComponentProps} from "./Slider.tsx";

const mediaData = mediasGen(3);

const meta = {
  title: "components/Slider",
  component: Slider,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    media: mediaData
  } as SliderComponentProps,
};
