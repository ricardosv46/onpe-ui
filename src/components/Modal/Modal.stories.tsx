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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Abrir Modal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="oui:bg-white oui:p-6"
      >
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-blue">
          Título del Modal
        </h2>
        <p className="oui:text-gray-600">Contenido del modal de ejemplo.</p>
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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Abrir Modal con botón cerrar
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeButton
        className="oui:bg-white oui:p-6"
      >
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-blue">
          Modal con botón cerrar
        </h2>
        <p className="oui:text-gray-600">
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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Abrir Modal sin fondo
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} whitoutBackground>
        <div className="oui:p-8 oui:bg-white oui:rounded oui:shadow-lg oui:text-center">
          <p className="oui:text-gray-700">Modal sin fondo blanco propio</p>
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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Abrir Modal (cierre deshabilitado)
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeDisabled
        escapeToClose={false}
        className="oui:bg-white oui:p-6"
      >
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-blue">
          Modal bloqueado
        </h2>
        <p className="oui:text-gray-600 oui:mb-6">
          No se puede cerrar haciendo clic fuera ni con Escape.
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="oui:px-4 oui:py-2 oui:bg-onpe-red oui:text-white oui:rounded oui:cursor-pointer"
        >
          Cerrar manualmente
        </button>
      </Modal>
    </>
  );
}

function ModalApilados() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  return (
    <>
      <button
        onClick={() => setModal1(true)}
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Abrir modal 1
      </button>

      <Modal isOpen={modal1} onClose={() => setModal1(false)} className="oui:bg-white oui:p-6">
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-blue">Modal 1</h2>
        <p className="oui:text-gray-600 oui:mb-4">Este es el primer modal.</p>
        <button
          onClick={() => setModal2(true)}
          className="oui:px-4 oui:py-2 oui:bg-onpe-skyblue oui:text-white oui:rounded oui:cursor-pointer"
        >
          Abrir modal 2 encima
        </button>
      </Modal>

      <Modal isOpen={modal2} onClose={() => setModal2(false)} className="oui:bg-white oui:p-6">
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-skyblue">Modal 2</h2>
        <p className="oui:text-gray-600 oui:mb-4">
          Este modal se apila sobre el anterior. El overlay tapa el contenido del modal 1.
        </p>
        <button
          onClick={() => setModal3(true)}
          className="oui:px-4 oui:py-2 oui:bg-onpe-red oui:text-white oui:rounded oui:cursor-pointer"
        >
          Abrir modal 3 encima
        </button>
      </Modal>

      <Modal isOpen={modal3} onClose={() => setModal3(false)} className="oui:bg-white oui:p-6">
        <h2 className="oui:text-xl oui:font-bold oui:mb-4 oui:text-onpe-red">Modal 3</h2>
        <p className="oui:text-gray-600">Tercer nivel. El overlay tapa todo lo anterior.</p>
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

export const Apilados: Story = {
  render: () => <ModalApilados />,
};
