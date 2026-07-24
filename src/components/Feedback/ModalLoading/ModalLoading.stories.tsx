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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Mostrar loading
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="oui:ml-4 oui:px-4 oui:py-2 oui:bg-onpe-red oui:text-white oui:rounded oui:cursor-pointer"
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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Procesar datos
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="oui:ml-4 oui:px-4 oui:py-2 oui:bg-onpe-red oui:text-white oui:rounded oui:cursor-pointer"
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
        className="oui:px-4 oui:py-2 oui:bg-onpe-blue oui:text-white oui:rounded oui:cursor-pointer"
      >
        Spinner personalizado
      </button>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="oui:ml-4 oui:px-4 oui:py-2 oui:bg-onpe-red oui:text-white oui:rounded oui:cursor-pointer"
        >
          Detener
        </button>
      )}
      <ModalLoading
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Subiendo archivo..."
        spinner={
          <div className="oui:flex oui:flex-col oui:items-center oui:gap-3">
            <div className="oui:w-16 oui:h-16 oui:rounded-full oui:border-4 oui:border-white oui:border-t-transparent oui:animate-spin" />
            <span className="oui:text-white oui:text-lg">📁</span>
          </div>
        }
      />
    </>
  );
}

export const SpinnerPersonalizado: Story = {
  render: () => <SpinnerPersonalizadoStory />,
};
