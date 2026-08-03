import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { IconCheck } from "../../icons/Actions/IconCheck";
import { IconClose } from "../../icons/Actions/IconClose";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["blue", "skyblue", "yellow", "gray", "dark-gray", "red", "green", "primary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "normal", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <IconCheck className="oui:w-full oui:h-full" />,
    label: "Confirmar",
    color: "skyblue",
  },
};

export const Disabled: Story = {
  args: {
    icon: <IconClose className="oui:w-full oui:h-full" />,
    label: "Cerrar",
    disabled: true,
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="oui:flex oui:flex-wrap oui:gap-4">
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Blue" color="blue" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Skyblue" color="skyblue" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Rojo" color="red" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Verde" color="green" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Amarillo" color="yellow" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Gris" color="gray" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="oui:flex oui:items-center oui:gap-4">
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Pequeño" size="small" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Normal" size="normal" />
      <IconButton icon={<IconCheck className="oui:w-full oui:h-full" />} label="Grande" size="large" />
    </div>
  ),
};
