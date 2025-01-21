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
  decorators: [
    (Story) => (
      <div style={{position: 'relative', minHeight: '800px'}}>
        <Story></Story>
      </div>
    )
  ]
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    media: mediaData
  } as SliderComponentProps,
};

export const SingleImage: Story = {
  args: {
    media: [mediaData[0]]
  } as SliderComponentProps,
};
