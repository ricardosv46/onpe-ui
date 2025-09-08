import type { Meta, StoryObj } from "@storybook/react";
import IconClose from "./IconClose";

const meta: Meta<typeof IconClose> = {
  title: "Icons/Actions/IconClose",
  component: IconClose,
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
    width: 16,
    height: 16,
  },
};

export const Small: Story = {
  args: {
    width: 8,
    height: 8,
  },
};

export const Medium: Story = {
  args: {
    width: 24,
    height: 24,
  },
};

export const Large: Story = {
  args: {
    width: 32,
    height: 32,
  },
};

export const WithColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <IconClose className="text-red" width={16} height={16} />
        <span className="text-gray-dark">Rojo</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconClose className="text-blue" width={16} height={16} />
        <span className="text-gray-dark">Azul</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconClose className="text-green" width={16} height={16} />
        <span className="text-gray-dark">Verde</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconClose className="text-gray-dark" width={16} height={16} />
        <span className="text-gray-dark">Gris Oscuro</span>
      </div>
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-red hover:bg-red/80">
          <IconClose className="text-white" width={12} height={12} />
        </button>
        <span className="text-gray-dark">Botón rojo</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-blue hover:bg-blue/80">
          <IconClose className="text-white" width={12} height={12} />
        </button>
        <span className="text-gray-dark">Botón azul</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-gray hover:bg-gray/80">
          <IconClose className="text-white" width={12} height={12} />
        </button>
        <span className="text-gray-dark">Botón gris</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="grid items-center grid-cols-4 gap-6">
      <div className="text-center">
        <IconClose width={8} height={8} className="mx-auto mb-2 text-blue" />
        <span className="text-xs text-gray-dark">8x8</span>
      </div>
      <div className="text-center">
        <IconClose width={12} height={12} className="mx-auto mb-2 text-blue" />
        <span className="text-xs text-gray-dark">12x12</span>
      </div>
      <div className="text-center">
        <IconClose width={16} height={16} className="mx-auto mb-2 text-blue" />
        <span className="text-xs text-gray-dark">16x16</span>
      </div>
      <div className="text-center">
        <IconClose width={24} height={24} className="mx-auto mb-2 text-blue" />
        <span className="text-xs text-gray-dark">24x24</span>
      </div>
    </div>
  ),
};
