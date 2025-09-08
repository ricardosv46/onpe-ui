import React, { useState } from "react";
import { BrowserIncompatible } from "./BrowserIncompatible";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BrowserIncompatible> = {
  title: "ErrorHandling/BrowserIncompatible",
  component: BrowserIncompatible,
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
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <BrowserIncompatible {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    className: "",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Demo Browser Incompatible</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Simula un navegador incompatible para probar el componente.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-red hover:bg-onpe-ui-red/80"
          >
            Simular Navegador Incompatible
          </button>
        </div>

        <BrowserIncompatible isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white rounded bg-onpe-ui-red hover:bg-onpe-ui-red">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <BrowserIncompatible {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    className: "border-2 border-red",
  },
};
