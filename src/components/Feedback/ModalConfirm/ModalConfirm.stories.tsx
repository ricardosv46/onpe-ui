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
    type: {
      control: { type: "select" },
      options: ["warning", "success", "question", "info", "none"],
    },
    buttonMode: {
      control: { type: "select" },
      options: ["single", "double", "confirm"],
    },
    color: {
      control: { type: "select" },
      options: ["blue", "red", "skyblue", "yellow"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
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
}

function AdvertenciaStory() {
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
        type="warning"
        color="red"
        textButtonConfirm="Eliminar"
        textButtonCancel="Cancelar"
        buttonMode="double"
        onConfirm={() => alert("Eliminado")}
      />
    </>
  );
}

function ExitoStory() {
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
        type="success"
        color="blue"
        buttonMode="single"
        textButtonConfirm="Aceptar"
      />
    </>
  );
}

function UnSoloBotonStory() {
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
        buttonMode="single"
        textButtonConfirm="Entendido"
      />
    </>
  );
}

function ConfirmarStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Abrir Sí/No
      </button>
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="¿Deseas iniciar el proceso?"
        message="Esta acción iniciará el flujo de importación."
        type="question"
        buttonMode="confirm"
        onConfirm={() => alert("Sí")}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const Advertencia: Story = {
  render: () => <AdvertenciaStory />,
};

export const Exito: Story = {
  render: () => <ExitoStory />,
};

export const UnSoloBoton: Story = {
  render: () => <UnSoloBotonStory />,
};

export const ConfirmarSiNo: Story = {
  render: () => <ConfirmarStory />,
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "¿Deseas continuar?",
    message: "Esta acción no se puede deshacer.",
    type: "warning",
    color: "blue",
    buttonMode: "double",
    textButtonConfirm: "Confirmar",
    textButtonCancel: "Cancelar",
  },
};
