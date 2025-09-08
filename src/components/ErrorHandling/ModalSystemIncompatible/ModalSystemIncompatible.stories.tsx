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
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white rounded bg-onpe-ui-red hover:bg-onpe-ui-red">
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
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Demo Device Incompatible</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Simula un sistema operativo incompatible para probar el componente.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-red hover:bg-onpe-ui-red/80"
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
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">
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
