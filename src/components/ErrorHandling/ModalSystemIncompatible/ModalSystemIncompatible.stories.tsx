import React, { useState } from "react";
import { ModalSystemIncompatible } from "./ModalSystemIncompatible";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalSystemIncompatible> = {
  title: "ErrorHandling/ModalSystemIncompatible",
  component: ModalSystemIncompatible,
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
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalSystemIncompatible {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {},
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

        <ModalSystemIncompatible isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const CustomStyling: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalSystemIncompatible {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    className: "border-2 border-red",
  },
};
