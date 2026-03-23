import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalLoading } from "./ModalLoading";

const meta: Meta<typeof ModalLoading> = {
  title: "Components/Feedback/ModalLoading",
  component: ModalLoading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
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
        Mostrar loading
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="ml-4 px-4 py-2 bg-onpe-red text-white rounded cursor-pointer"
        >
          Detener
        </button>
      )}
      <ModalLoading isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function MensajePersonalizadoStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Procesar datos
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="ml-4 px-4 py-2 bg-onpe-red text-white rounded cursor-pointer"
        >
          Detener
        </button>
      )}
      <ModalLoading
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Procesando datos..."
      />
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

export const MensajePersonalizado: Story = {
  render: () => <MensajePersonalizadoStory />,
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    message: "Cargando...",
  },
};

function SpinnerPersonalizadoStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Spinner personalizado
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="ml-4 px-4 py-2 bg-onpe-red text-white rounded cursor-pointer"
        >
          Detener
        </button>
      )}
      <ModalLoading
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Subiendo archivo..."
        spinner={
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin" />
            <span className="text-white text-lg">📁</span>
          </div>
        }
      />
    </>
  );
}

export const SpinnerPersonalizado: Story = {
  render: () => <SpinnerPersonalizadoStory />,
};
