import type { Meta, StoryObj } from "@storybook/react";
import { IconHome } from "./IconHome";

const meta: Meta<typeof IconHome> = {
  title: "Icons/Actions/IconHome",
  component: IconHome,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 64, step: 4 },
      description: "Tamaño del icono en píxeles",
    },
    className: {
      control: "text",
      description: "Clases CSS adicionales",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 20,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const Large: Story = {
  args: {
    size: 32,
  },
};

export const WithCustomColor: Story = {
  args: {
    size: 24,
    className: "text-blue-500",
  },
};

export const WithOnpeColors: Story = {
  args: {
    size: 24,
    className: "text-onpe-ui-blue",
  },
};

export const Interactive: Story = {
  args: {
    size: 20,
    className: "text-gray-600 hover:text-onpe-ui-blue transition-colors cursor-pointer",
  },
};
