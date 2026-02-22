import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalConfirm } from "./ModalConfirm";

const meta: Meta<typeof ModalConfirm> = {
  title: "Components/Feedback/ModalConfirm",
  component: ModalConfirm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "select" },
      options: ["warning", "success"],
    },
    color: {
      control: { type: "select" },
      options: ["blue", "red"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
        >
          Abrir confirmación
        </button>
        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="¿Deseas continuar?"
          message="Esta acción no se puede deshacer."
          onConfirm={() => alert("Confirmado")}
          onCancel={() => setIsOpen(false)}
        />
      </>
    );
  },
};

export const Advertencia: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-onpe-red text-white rounded cursor-pointer"
        >
          Abrir advertencia
        </button>
        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="¿Estás seguro?"
          message="Esta operación eliminará los datos permanentemente."
          icon="warning"
          color="red"
          textButtonConfirm="Eliminar"
          textButtonCancel="Cancelar"
          onConfirm={() => alert("Eliminado")}
        />
      </>
    );
  },
};

export const Exito: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
        >
          Abrir éxito
        </button>
        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Operación completada"
          message="Los datos se han guardado correctamente."
          icon="success"
          color="blue"
          twoButtons={false}
          textButtonConfirm="Aceptar"
        />
      </>
    );
  },
};

export const UnSoloBoton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
        >
          Abrir (un botón)
        </button>
        <ModalConfirm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Información"
          message="Por favor, revisa los datos antes de continuar."
          twoButtons={false}
          textButtonConfirm="Entendido"
        />
      </>
    );
  },
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "¿Deseas continuar?",
    message: "Esta acción no se puede deshacer.",
    icon: "warning",
    color: "blue",
    twoButtons: true,
    textButtonConfirm: "Confirmar",
    textButtonCancel: "Cancelar",
  },
};
