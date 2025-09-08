import React from "react";
import { IconWarning } from "./IconWarning";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconWarning> = {
  title: "Icons/Actions/IconWarning",
  component: IconWarning,
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
    className: "text-yellow",
  },
};

export const Small: Story = {
  args: {
    width: 30,
    height: 25,
    className: "text-yellow",
  },
};

export const Large: Story = {
  args: {
    width: 120,
    height: 102,
    className: "text-yellow",
  },
};

export const Red: Story = {
  args: {
    className: "text-red",
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    width: 60,
    height: 51,
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
            <IconWarning width={30} height={25} className="text-yellow" />
            <p className="text-sm text-gray-dark mt-1">30x25</p>
          </div>
          <div className="text-center">
            <IconWarning width={60} height={51} className="text-yellow" />
            <p className="text-sm text-gray-dark mt-1">60x51</p>
          </div>
          <div className="text-center">
            <IconWarning width={90} height={76} className="text-yellow" />
            <p className="text-sm text-gray-dark mt-1">90x76</p>
          </div>
          <div className="text-center">
            <IconWarning width={120} height={102} className="text-yellow" />
            <p className="text-sm text-gray-dark mt-1">120x102</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-dark">Colores</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconWarning className="text-yellow" />
            <p className="text-sm text-gray-dark mt-1">Amarillo</p>
          </div>
          <div className="text-center">
            <IconWarning className="text-red" />
            <p className="text-sm text-gray-dark mt-1">Rojo</p>
          </div>
          <div className="text-center">
            <IconWarning className="text-skyblue" />
            <p className="text-sm text-gray-dark mt-1">Skyblue</p>
          </div>
          <div className="text-center">
            <IconWarning className="text-gray" />
            <p className="text-sm text-gray-dark mt-1">Gris</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
