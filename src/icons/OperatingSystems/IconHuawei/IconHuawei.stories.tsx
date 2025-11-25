import React from "react";
import { IconHuawei } from "./IconHuawei";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconHuawei> = {
  title: "Icons/Logos/IconHuawei",
  component: IconHuawei,
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
    className: "text-onpe-ui-blue",
  },
};

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    className: "text-onpe-ui-blue",
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    className: "text-onpe-ui-blue",
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    width: 24,
    height: 24,
    className: "text-onpe-ui-skyblue",
  },
};

export const AllSizesAndColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-onpe-ui-gray-dark">
          Tamaños
        </h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconHuawei width={16} height={16} className="text-onpe-ui-blue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">16x16</p>
          </div>
          <div className="text-center">
            <IconHuawei width={24} height={24} className="text-onpe-ui-blue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">24x24</p>
          </div>
          <div className="text-center">
            <IconHuawei width={32} height={32} className="text-onpe-ui-blue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">32x32</p>
          </div>
          <div className="text-center">
            <IconHuawei width={48} height={48} className="text-onpe-ui-blue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">48x48</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-onpe-ui-gray-dark">
          Colores
        </h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconHuawei className="text-onpe-ui-blue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">Azul</p>
          </div>
          <div className="text-center">
            <IconHuawei className="text-onpe-ui-skyblue" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">Skyblue</p>
          </div>
          <div className="text-center">
            <IconHuawei className="text-onpe-ui-red" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">Rojo</p>
          </div>
          <div className="text-center">
            <IconHuawei className="text-onpe-ui-gray" />
            <p className="text-sm text-onpe-ui-gray-dark mt-1">Gris</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
