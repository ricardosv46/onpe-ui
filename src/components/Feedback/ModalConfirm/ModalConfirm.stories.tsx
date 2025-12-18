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
    color: {
      control: { type: "select" },
      options: ["blue", "red"],
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
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white rounded bg-onpe-ui-red hover:bg-onpe-ui-red"
          >
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalConfirm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: "¿Estás seguro?",
    message: "",
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
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white rounded bg-onpe-ui-green hover:bg-onpe-ui-green"
          >
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <ModalConfirm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
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
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">
            Demo Modal Confirm
          </h2>
          <p className="mb-6 text-onpe-ui-gray-dark">
            Prueba diferentes tipos de confirmación.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-onpe-ui-gray-dark">
                Tipo de icono:
              </label>
              <select
                value={icon}
                onChange={(e) =>
                  setIcon(e.target.value as "warning" | "success")
                }
                className="w-full p-2 border rounded border-gray focus:outline-none focus:ring-2 focus:ring-blue"
              >
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-red hover:bg-onpe-ui-red/80"
            >
              Abrir Modal de Confirmación
            </button>
          </div>
        </div>

        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={icon === "warning" ? "¿Estás seguro?" : "¡Operación exitosa!"}
          message={
            icon === "warning"
              ? "Esta acción no se puede deshacer."
              : "Los datos se han guardado correctamente."
          }
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

export const BlueColor: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue/80"
          >
            {isOpen ? "Cerrar Modal" : "Abrir Modal Azul"}
          </button>
        </div>
        <ModalConfirm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: "Confirmación Azul",
    message: "Este modal usa el color azul por defecto.",
    icon: "warning",
    color: "blue",
    textButtonConfirm: "Confirmar",
    textButtonCancel: "Cancelar",
    twoButtons: true,
  },
};

export const RedColor: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white rounded bg-onpe-ui-red hover:bg-onpe-ui-red/80"
          >
            {isOpen ? "Cerrar Modal" : "Abrir Modal Rojo"}
          </button>
        </div>
        <ModalConfirm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: "Confirmación Roja",
    message: "Este modal usa el color rojo para el icono y título.",
    icon: "warning",
    color: "red",
    textButtonConfirm: "Eliminar",
    textButtonCancel: "Cancelar",
    twoButtons: true,
  },
};

export const SuccessRed: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 rounded bg-onpe-ui-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white rounded bg-onpe-ui-green hover:bg-onpe-ui-green/80"
          >
            {isOpen ? "Cerrar Modal" : "Abrir Modal Éxito Rojo"}
          </button>
        </div>
        <ModalConfirm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: "Operación Exitosa",
    message: "La operación se completó correctamente.",
    icon: "success",
    color: "red",
    textButtonConfirm: "Aceptar",
    twoButtons: false,
  },
};
