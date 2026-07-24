import type { Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "blue",
        "skyblue",
        "skyblue-light",
        "yellow",
        "light-skyblue",
        "gray",
        "gray-light",
        "gray-extra-light",
        "red",
        "dark-gray",
        "green",
        "yellow-light",
        "primary",
      ],
    },
    show: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    show: true,
    color: "blue",
  },
  render: (args) => (
    <div className="oui:relative oui:h-64">
      <div className="oui:p-8 oui:text-xl oui:font-semibold">Contenido detrás del overlay</div>
      <Overlay {...args} />
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    show: false,
    color: "blue",
  },
  render: (args) => (
    <div className="oui:relative oui:h-64">
      <div className="oui:p-8 oui:text-xl oui:font-semibold">Sin overlay (oculto)</div>
      <Overlay {...args} />
    </div>
  ),
};

export const ColorRed: Story = {
  args: {
    show: true,
    color: "red",
  },
  render: (args) => (
    <div className="oui:relative oui:h-64">
      <div className="oui:p-8 oui:text-xl oui:font-semibold">Overlay rojo</div>
      <Overlay {...args} />
    </div>
  ),
};

export const ColorSkyblue: Story = {
  args: {
    show: true,
    color: "skyblue",
  },
  render: (args) => (
    <div className="oui:relative oui:h-64">
      <div className="oui:p-8 oui:text-xl oui:font-semibold">Overlay skyblue</div>
      <Overlay {...args} />
    </div>
  ),
};
