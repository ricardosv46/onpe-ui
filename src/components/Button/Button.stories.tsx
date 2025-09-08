import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    loading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Botón Primario",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Botón Secundario",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Botón Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Botón Ghost",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Cargando...",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Pequeño",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Grande",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Deshabilitado",
  },
};
