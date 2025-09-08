import React, { useState } from "react";
import { ModalConfirm } from "./ModalConfirm";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalConfirm> = {
  title: "Feedback/ModalConfirm",
  component: ModalConfirm,
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
    icon: {
      control: { type: "select" },
      options: ["warning", "success"],
    },
    twoButtons: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalConfirm {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "¿Estás seguro?",
    message: "Esta acción no se puede deshacer. ¿Deseas continuar?",
    icon: "warning",
    textButtonConfirm: "Sí, eliminar",
    textButtonCancel: "Cancelar",
    twoButtons: true,
  },
};

export const Success: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalConfirm {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    title: "¡Operación exitosa!",
    message: "Los datos se han guardado correctamente.",
    icon: "success",
    textButtonConfirm: "Aceptar",
    twoButtons: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [icon, setIcon] = useState<"warning" | "success">("warning");

    return (
      <div className="min-h-screen bg-gray-extra-light p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="mb-4 text-xl font-bold text-blue">Demo Modal Confirm</h2>
          <p className="mb-6 text-gray-dark">Prueba diferentes tipos de confirmación.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-dark mb-2">Tipo de icono:</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value as "warning" | "success")}
                className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-blue"
              >
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-red hover:bg-red/80"
            >
              Abrir Modal de Confirmación
            </button>
          </div>
        </div>

        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={icon === "warning" ? "¿Estás seguro?" : "¡Operación exitosa!"}
          message={icon === "warning" ? "Esta acción no se puede deshacer." : "Los datos se han guardado correctamente."}
          icon={icon}
          onConfirm={() => console.log("Confirmado")}
          onCancel={() => console.log("Cancelado")}
          textButtonConfirm={icon === "warning" ? "Sí, eliminar" : "Aceptar"}
          textButtonCancel="Cancelar"
          twoButtons={icon === "warning"}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};
