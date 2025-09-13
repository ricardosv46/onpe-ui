import React from "react";
import IconDnie3 from "./IconDnie3";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconDnie3> = {
  title: "Icons/ONPE/IconDnie3",
  component: IconDnie3,
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
    width: 201,
    height: 117,
  },
};

export const Small: Story = {
  args: {
    width: 100,
    height: 58,
  },
};

export const Medium: Story = {
  args: {
    width: 150,
    height: 87,
  },
};

export const Large: Story = {
  args: {
    width: 300,
    height: 175,
  },
};

export const WithCustomClass: Story = {
  args: {
    width: 201,
    height: 117,
    className: "border-2 border-gray-300 rounded-lg p-2",
  },
};
