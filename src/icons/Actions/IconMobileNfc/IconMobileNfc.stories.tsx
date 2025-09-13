import React from "react";
import IconMobileNfc from "./IconMobileNfc";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconMobileNfc> = {
  title: "Icons/Actions/IconMobileNfc",
  component: IconMobileNfc,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Clases CSS adicionales",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-8 h-8 text-onpe-ui-blue",
  },
};

export const Large: Story = {
  args: {
    className: "w-16 h-16 text-onpe-ui-skyblue",
  },
};

export const Small: Story = {
  args: {
    className: "w-4 h-4 text-onpe-ui-green",
  },
};
