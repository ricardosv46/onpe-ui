import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Full: Story = {
  args: { full: true },
  parameters: { layout: "fullscreen" },
};

export const FullAbsolute: Story = {
  args: { full: true, absolute: true },
  parameters: { layout: "fullscreen" },
};
