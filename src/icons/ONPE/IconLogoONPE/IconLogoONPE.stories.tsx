import React from "react";
import { IconLogoONPE } from "./IconLogoONPE";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconLogoONPE> = {
  title: "Icons/Logos/IconLogoONPE",
  component: IconLogoONPE,
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
    width: 109,
    height: 66,
  },
};

export const Small: Story = {
  args: {
    width: 55,
    height: 33,
  },
};

export const Large: Story = {
  args: {
    width: 218,
    height: 132,
  },
};

export const CustomStyling: Story = {
  args: {
    width: 109,
    height: 66,
    className: "border-2 border-blue-500 rounded-lg p-4",
  },
};
