import React, { useState } from "react";
import { ModalDeviceIncompatible } from "./ModalDeviceIncompatible";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalDeviceIncompatible> = {
  title: "ErrorHandling/ModalDeviceIncompatible",
  component: ModalDeviceIncompatible,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    onClose: {
      action: "closed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gray-extra-light p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="mb-4 text-xl font-bold text-blue">Demo Device Incompatible</h2>
          <p className="mb-6 text-gray-dark">Simula un sistema operativo incompatible para probar el componente.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-red hover:bg-red/80"
          >
            Simular Sistema Incompatible
          </button>
        </div>

        <ModalDeviceIncompatible isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    className: "border-2 border-red",
  },
};
