import type { Meta, StoryObj } from "@storybook/react";
import { IconCloseRadius } from "./IconCloseRadius";

const meta: Meta<typeof IconCloseRadius> = {
  title: "Icons/Actions/IconCloseRadius",
  component: IconCloseRadius,
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
        <IconCloseRadius className="text-onpe-ui-red" width={16} height={16} />
        <span className="text-onpe-ui-gray-dark">Rojo</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconCloseRadius className="text-onpe-ui-blue" width={16} height={16} />
        <span className="text-onpe-ui-gray-dark">Azul</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconCloseRadius className="text-onpe-ui-green" width={16} height={16} />
        <span className="text-onpe-ui-gray-dark">Verde</span>
      </div>
      <div className="flex items-center space-x-4">
        <IconCloseRadius className="text-onpe-ui-gray-dark" width={16} height={16} />
        <span className="text-onpe-ui-gray-dark">Gris Oscuro</span>
      </div>
    </div>
  ),
};

export const InButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-onpe-ui-red hover:bg-onpe-ui-red/80">
          <IconCloseRadius className="text-white" width={12} height={12} />
        </button>
        <span className="text-onpe-ui-gray-dark">Botón rojo</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-onpe-ui-blue hover:bg-onpe-ui-blue/80">
          <IconCloseRadius className="text-white" width={12} height={12} />
        </button>
        <span className="text-onpe-ui-gray-dark">Botón azul</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-white transition-colors rounded-full bg-onpe-ui-gray hover:bg-onpe-ui-gray/80">
          <IconCloseRadius className="text-white" width={12} height={12} />
        </button>
        <span className="text-onpe-ui-gray-dark">Botón gris</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="grid items-center grid-cols-4 gap-6">
      <div className="text-center">
        <IconCloseRadius width={8} height={8} className="mx-auto mb-2 text-onpe-ui-blue" />
        <span className="text-xs text-onpe-ui-gray-dark">8x8</span>
      </div>
      <div className="text-center">
        <IconCloseRadius width={12} height={12} className="mx-auto mb-2 text-onpe-ui-blue" />
        <span className="text-xs text-onpe-ui-gray-dark">12x12</span>
      </div>
      <div className="text-center">
        <IconCloseRadius width={16} height={16} className="mx-auto mb-2 text-onpe-ui-blue" />
        <span className="text-xs text-onpe-ui-gray-dark">16x16</span>
      </div>
      <div className="text-center">
        <IconCloseRadius width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
        <span className="text-xs text-onpe-ui-gray-dark">24x24</span>
      </div>
    </div>
  ),
};
