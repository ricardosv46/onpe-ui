import React from "react";
import { ElectionsIcon } from "./ElectionsIcon";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ElectionsIcon> = {
  title: "Icons/Logos/ElectionsIcon",
  component: ElectionsIcon,
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
    width: 350,
    height: 70,
  },
};

export const Small: Story = {
  args: {
    width: 175,
    height: 35,
  },
};

export const Large: Story = {
  args: {
    width: 700,
    height: 140,
  },
};

export const CustomStyling: Story = {
  args: {
    width: 350,
    height: 70,
    className: "border-2 border-blue-500 rounded-lg p-4",
  },
};
