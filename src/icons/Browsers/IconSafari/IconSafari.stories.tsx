import React from "react";
import { IconSafari } from "./IconSafari";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconSafari> = {
  title: "Icons/Browsers/IconSafari",
  component: IconSafari,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
  },
};

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
  },
};

export const CustomStyling: Story = {
  args: {
    width: 24,
    height: 24,
    className: "text-onpe-ui-gray-600",
  },
};
