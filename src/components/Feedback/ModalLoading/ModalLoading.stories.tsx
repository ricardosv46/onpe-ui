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
  args: {
    isOpen: true,
    onClose: () => {},
    message: "Cargando...",
  },
};

export const CustomMessage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    message: "Procesando datos, por favor espere...",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("Cargando...");

    return (
      <div className="min-h-screen bg-gray-extra-light p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="mb-4 text-xl font-bold text-blue">Demo Modal Loading</h2>
          <p className="mb-6 text-gray-dark">Prueba diferentes mensajes de carga.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-dark mb-2">Mensaje:</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-blue"
                placeholder="Ingresa un mensaje..."
              />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-blue hover:bg-blue/80"
            >
              Mostrar Loading
            </button>
          </div>
        </div>

        <ModalLoading isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} />
      </div>
    );
  },
};
