import React from "react";
import { IconSpinnerDesktop } from "./IconSpinnerDesktop";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconSpinnerDesktop> = {
  title: "Icons/Actions/IconSpinnerDesktop",
  component: IconSpinnerDesktop,
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
    className: "text-onpe-ui-blue animate-spin",
  },
};

export const Small: Story = {
  args: {
    width: 51,
    height: 51,
    className: "text-onpe-ui-blue animate-spin",
  },
};

export const Large: Story = {
  args: {
    width: 204,
    height: 204,
    className: "text-onpe-ui-blue animate-spin",
  },
};

export const White: Story = {
  args: {
    className: "text-white animate-spin",
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    width: 102,
    height: 102,
    className: "text-onpe-ui-skyblue animate-spin",
  },
};

export const AllSizesAndColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-gray-dark">Tamaños</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconSpinnerDesktop width={51} height={51} className="text-onpe-ui-blue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">51x51</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop width={102} height={102} className="text-onpe-ui-blue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">102x102</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop width={153} height={153} className="text-onpe-ui-blue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">153x153</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop width={204} height={204} className="text-onpe-ui-blue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">204x204</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-gray-dark">Colores</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconSpinnerDesktop className="text-onpe-ui-blue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">Azul</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop className="text-white animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">Blanco</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop className="text-onpe-ui-skyblue animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">Skyblue</p>
          </div>
          <div className="text-center">
            <IconSpinnerDesktop className="text-onpe-ui-gray animate-spin" />
            <p className="mt-1 text-sm text-onpe-ui-gray-dark">Gris</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
