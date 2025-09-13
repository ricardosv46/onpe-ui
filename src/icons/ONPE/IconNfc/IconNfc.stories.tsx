import React from "react";
import IconNfc from "./IconNfc";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconNfc> = {
  title: "Icons/ONPE/IconNfc",
  component: IconNfc,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number" },
      description: "Ancho del icono",
    },
    height: {
      control: { type: "number" },
      description: "Alto del icono",
    },
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
    width: 273,
    height: 348,
  },
};

export const Small: Story = {
  args: {
    width: 136,
    height: 174,
  },
};

export const Medium: Story = {
  args: {
    width: 200,
    height: 255,
  },
};

export const Large: Story = {
  args: {
    width: 400,
    height: 510,
  },
};

export const WithCustomClass: Story = {
  args: {
    width: 273,
    height: 348,
    className: "border-2 border-gray-300 rounded-lg p-2",
  },
};
