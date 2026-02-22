import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRecommended } from "./BrowserRecommended";

const meta: Meta<typeof BrowserRecommended> = {
  title: "Components/BrowserRecommended",
  component: BrowserRecommended,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
