import React from "react";
import { IconPersonOnpe } from "./IconPersonOnpe";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconPersonOnpe> = {
  title: "Icons/Logos/IconPersonOnpe",
  component: IconPersonOnpe,
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
    width: 230,
    height: 80,
  },
};

export const Small: Story = {
  args: {
    width: 115,
    height: 40,
  },
};

export const Large: Story = {
  args: {
    width: 460,
    height: 160,
  },
};

export const CustomStyling: Story = {
  args: {
    width: 230,
    height: 80,
    className: "border-2 border-blue-500 rounded-lg p-4",
  },
};
