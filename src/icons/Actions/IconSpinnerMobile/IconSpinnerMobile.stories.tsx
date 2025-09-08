import React from "react";
import { IconSpinnerMobile } from "./IconSpinnerMobile";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconSpinnerMobile> = {
  title: "Icons/Actions/IconSpinnerMobile",
  component: IconSpinnerMobile,
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
    className: "text-blue animate-spin",
  },
};

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    className: "text-blue animate-spin",
  },
};

export const Large: Story = {
  args: {
    width: 66,
    height: 66,
    className: "text-blue animate-spin",
  },
};

export const White: Story = {
  args: {
    className: "text-white animate-spin",
  },
};

export const CustomSizeAndColor: Story = {
  args: {
    width: 33,
    height: 33,
    className: "text-skyblue animate-spin",
  },
};

export const AllSizesAndColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-dark">Tamaños</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconSpinnerMobile width={16} height={16} className="text-blue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">16x16</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile width={33} height={33} className="text-blue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">33x33</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile width={49} height={49} className="text-blue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">49x49</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile width={66} height={66} className="text-blue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">66x66</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-dark">Colores</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <IconSpinnerMobile className="text-blue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">Azul</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile className="text-white animate-spin" />
            <p className="text-sm text-gray-dark mt-1">Blanco</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile className="text-skyblue animate-spin" />
            <p className="text-sm text-gray-dark mt-1">Skyblue</p>
          </div>
          <div className="text-center">
            <IconSpinnerMobile className="text-gray animate-spin" />
            <p className="text-sm text-gray-dark mt-1">Gris</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
