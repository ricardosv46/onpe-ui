import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["red", "skyblue", "blue", "gray", "dark-gray"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "normal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Limpiar filtros",
    color: "red",
  },
};

export const Disabled: Story = {
  args: {
    title: "Limpiar filtros",
    disabled: true,
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <LinkButton title="Rojo" color="red" />
      <LinkButton title="Skyblue" color="skyblue" />
      <LinkButton title="Azul" color="blue" />
      <LinkButton title="Gris" color="gray" />
      <LinkButton title="Gris oscuro" color="dark-gray" />
    </div>
  ),
};
