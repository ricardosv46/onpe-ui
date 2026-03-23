import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { ModalLoadingPercentage } from "./ModalLoadingPercentage";

const meta: Meta<typeof ModalLoadingPercentage> = {
  title: "Components/Feedback/ModalLoadingPercentage",
  component: ModalLoadingPercentage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    percentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
    message: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const [isOpen, setIsOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPercentage(0);
      return;
    }
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsOpen(false), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Iniciar proceso
      </button>
      <ModalLoadingPercentage
        isOpen={isOpen}
        message="Procesando"
        percentage={percentage}
      />
    </>
  );
}

function MensajePersonalizadoStory() {
  const [isOpen, setIsOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPercentage(0);
      return;
    }
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsOpen(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-onpe-blue text-white rounded cursor-pointer"
      >
        Importar padrón
      </button>
      <ModalLoadingPercentage
        isOpen={isOpen}
        message="Importando padrón electoral"
        percentage={percentage}
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
    message: "Cargando",
    percentage: 65,
  },
};
