import React, { useState } from "react";
import { ModalLoading } from "./ModalLoading";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalLoading> = {
  title: "Feedback/ModalLoading",
  component: ModalLoading,
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
    message: {
      control: { type: "text" },
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
        <ModalLoading {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    message: "Cargando...",
  },
};

export const CustomMessage: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white rounded bg-onpe-ui-green hover:bg-onpe-ui-green">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalLoading {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    message: "Procesando datos, por favor espere...",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("Cargando...");

    return (
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Demo Modal Loading</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Prueba diferentes mensajes de carga.</p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-onpe-ui-gray-dark">Mensaje:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded border-gray focus:outline-none focus:ring-2 focus:ring-blue"
                placeholder="Ingresa un mensaje..."
              />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue/80"
            >
              Mostrar Loading
            </button>
          </div>
        </div>

        <ModalLoading isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} />
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true,
    },
  },
};
