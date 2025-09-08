import React from "react";
import { IconMozillaColor } from "./IconMozillaColor";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconMozillaColor> = {
  title: "Icons/Logos/IconMozillaColor",
  component: IconMozillaColor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
    },
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "text-blue",
  },
};

export const Small: Story = {
  args: {
    width: 24,
    height: 24,
    className: "text-blue",
  },
};

export const Large: Story = {
  args: {
    width: 96,
    height: 96,
    className: "text-blue",
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    width: 48,
    height: 48,
    className: "text-skyblue",
  },
};

export const AllSizesAndColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-dark">Tamaños</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconMozillaColor width={24} height={24} className="text-blue" />
            <p className="text-sm text-gray-dark mt-1">24x24</p>
          </div>
          <div className="text-center">
            <IconMozillaColor width={48} height={48} className="text-blue" />
            <p className="text-sm text-gray-dark mt-1">48x48</p>
          </div>
          <div className="text-center">
            <IconMozillaColor width={72} height={72} className="text-blue" />
            <p className="text-sm text-gray-dark mt-1">72x72</p>
          </div>
          <div className="text-center">
            <IconMozillaColor width={96} height={96} className="text-blue" />
            <p className="text-sm text-gray-dark mt-1">96x96</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-dark">Colores</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconMozillaColor className="text-blue" />
            <p className="text-sm text-gray-dark mt-1">Azul</p>
          </div>
          <div className="text-center">
            <IconMozillaColor className="text-skyblue" />
            <p className="text-sm text-gray-dark mt-1">Skyblue</p>
          </div>
          <div className="text-center">
            <IconMozillaColor className="text-red" />
            <p className="text-sm text-gray-dark mt-1">Rojo</p>
          </div>
          <div className="text-center">
            <IconMozillaColor className="text-gray" />
            <p className="text-sm text-gray-dark mt-1">Gris</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
