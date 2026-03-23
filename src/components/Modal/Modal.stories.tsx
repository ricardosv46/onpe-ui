import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    overlayColor: {
      control: { type: "select" },
      options: [
        "blue",
        "skyblue",
        "skyblue-light",
        "yellow",
        "light-skyblue",
        "gray",
        "gray-light",
        "gray-extra-light",
        "red",
        "dark-gray",
        "green",
        "yellow-light",
        "primary",
      ],
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
        Abrir Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-white p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-onpe-blue">
          Título del Modal
        </h2>
        <p className="text-gray-600">Contenido del modal de ejemplo.</p>
      </Modal>
    </>
  );
}

function ConBotonCerrarStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Abrir Modal con botón cerrar
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeButton
        className="bg-white p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-onpe-blue">
          Modal con botón cerrar
        </h2>
        <p className="text-gray-600">
          Este modal tiene un botón X en la esquina superior derecha.
        </p>
      </Modal>
    </>
  );
}

function SinFondoStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Abrir Modal sin fondo
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} whitoutBackground>
        <div className="p-8 bg-white rounded shadow-lg text-center">
          <p className="text-gray-700">Modal sin fondo blanco propio</p>
        </div>
      </Modal>
    </>
  );
}

function CierreDeshabilitadoStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Abrir Modal (cierre deshabilitado)
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeDisabled
        escapeToClose={false}
        className="bg-white p-6"
      >
        <h2 className="text-xl font-bold mb-4 text-onpe-blue">
          Modal bloqueado
        </h2>
        <p className="text-gray-600 mb-6">
          No se puede cerrar haciendo clic fuera ni con Escape.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-onpe-red text-white rounded cursor-pointer"
        >
          Cerrar manualmente
        </button>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const ConBotonCerrar: Story = {
  render: () => <ConBotonCerrarStory />,
};

export const SinFondo: Story = {
  render: () => <SinFondoStory />,
};

export const CierreDeshabilitado: Story = {
  render: () => <CierreDeshabilitadoStory />,
};
