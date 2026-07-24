import type { Meta, StoryObj } from "@storybook/react";
import { NotRecommended } from "./NotRecommended";

const meta: Meta<typeof NotRecommended> = {
  title: "Components/ErrorHandling/NotRecommended",
  component: NotRecommended,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    bottom: { control: "number" },
    right: { control: "number" },
    isOpenBrowserError: { control: "boolean" },
    isOpenDeviceError: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NavegadorNoRecomendado: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: false,
    bottom: 40,
    right: 20,
  },
  render: (args) => (
    <div className="oui:relative oui:h-64 oui:bg-gray-50">
      <p className="oui:p-8 oui:text-gray-500">Página de ejemplo con aviso flotante</p>
      <NotRecommended {...args} />
    </div>
  ),
};

export const SistemaNoRecomendado: Story = {
  args: {
    isOpenBrowserError: false,
    isOpenDeviceError: true,
    bottom: 40,
    right: 20,
  },
  render: (args) => (
    <div className="oui:relative oui:h-64 oui:bg-gray-50">
      <p className="oui:p-8 oui:text-gray-500">Página de ejemplo con aviso flotante</p>
      <NotRecommended {...args} />
    </div>
  ),
};

export const AmbosErrores: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: true,
    bottom: 40,
    right: 20,
  },
  render: (args) => (
    <div className="oui:relative oui:h-64 oui:bg-gray-50">
      <p className="oui:p-8 oui:text-gray-500">Página de ejemplo con aviso flotante</p>
      <NotRecommended {...args} />
    </div>
  ),
};
