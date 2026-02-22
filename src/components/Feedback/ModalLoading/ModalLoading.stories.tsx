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

export const Default: Story = {
  render: () => {
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
  },
};

export const MensajePersonalizado: Story = {
  render: () => {
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
  },
};

export const Abierto: Story = {
  args: {
    isOpen: true,
    message: "Cargando...",
  },
};
