import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "../Button/Button";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
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
    closeButton: {
      control: { type: "boolean" },
    },
    whitoutBackground: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-blue-500 rounded hover:bg-onpe-ui-blue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="mb-4 text-2xl font-bold text-onpe-ui-blue">Modal Básico</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este es un modal básico con contenido simple.</p>
          <Button color="primary" title="Cerrar" onClick={() => setIsOpen(false)} />
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const WithCloseButton: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-green-500 rounded hover:bg-onpe-ui-green-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} closeButton={true}>
          <h2 className="mb-4 text-2xl font-bold text-onpe-ui-blue">Modal con Botón Cerrar</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este modal tiene un botón de cerrar en la esquina superior derecha.</p>
          <div className="space-y-3">
            <Button color="primary" title="Aceptar" className="w-full" />
            <Button color="red" title="Cancelar" onClick={() => setIsOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Demo Interactivo de Modal</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue/80"
          >
            Abrir Modal
          </button>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} overlayColor="blue" closeButton={true}>
          <h2 className="mb-4 text-2xl font-bold text-onpe-ui-blue">Modal Interactivo</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este modal se puede configurar con diferentes opciones.</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
};
