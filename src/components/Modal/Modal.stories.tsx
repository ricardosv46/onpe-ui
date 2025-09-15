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
    className: {
      control: { type: "text" },
      description: "Clases CSS para personalizar el modal (ej: onpe-modal-size-sm, onpe-modal-size-lg)",
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
    zIndexLevel: {
      control: { type: "number" },
      description: "Nivel de z-index para controlar el orden de apilamiento de modales",
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

export const SmallSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-blue-500 rounded hover:bg-onpe-ui-blue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal Pequeño"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} className="onpe-modal-size-sm">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Modal Pequeño</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este es un modal pequeño (400px).</p>
          <Button color="primary" title="Cerrar" onClick={() => setIsOpen(false)} />
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const LargeSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-blue-500 rounded hover:bg-onpe-ui-blue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal Grande"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} className="onpe-modal-size-lg">
          <h2 className="mb-4 text-2xl font-bold text-onpe-ui-blue">Modal Grande</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este es un modal grande (800px).</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const ExtraLargeSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-blue-500 rounded hover:bg-onpe-ui-blue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal Extra Grande"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} className="onpe-modal-size-xl">
          <h2 className="mb-4 text-3xl font-bold text-onpe-ui-blue">Modal Extra Grande</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este es un modal extra grande (1000px).</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const FullSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-blue-500 rounded hover:bg-onpe-ui-blue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal Pantalla Completa"}
          </button>
        </div>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} className="onpe-modal-size-full">
          <h2 className="mb-4 text-3xl font-bold text-onpe-ui-blue">Modal Pantalla Completa</h2>
          <p className="mb-6 text-onpe-ui-gray-dark">Este modal ocupa toda la pantalla.</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};

export const MultipleModals: Story = {
  render: (args) => {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const [isThirdOpen, setIsThirdOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded space-y-2">
          <button onClick={() => setIsFirstOpen(!isFirstOpen)} className="block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            {isFirstOpen ? "Cerrar Modal 1" : "Abrir Modal 1 (z-index: 1000)"}
          </button>
          <button onClick={() => setIsSecondOpen(!isSecondOpen)} className="block px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            {isSecondOpen ? "Cerrar Modal 2" : "Abrir Modal 2 (z-index: 2000)"}
          </button>
          <button onClick={() => setIsThirdOpen(!isThirdOpen)} className="block px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
            {isThirdOpen ? "Cerrar Modal 3" : "Abrir Modal 3 (z-index: 3000)"}
          </button>
        </div>

        {/* Modal 1 - Nivel base */}
        <Modal {...args} isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)} zIndexLevel={1000} overlayColor="blue">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Modal Nivel 1</h2>
          <p className="mb-6 text-gray-700">Este modal tiene z-index: 1000 (nivel base)</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsFirstOpen(false)} className="w-full" />
          </div>
        </Modal>

        {/* Modal 2 - Nivel medio */}
        <Modal {...args} isOpen={isSecondOpen} onClose={() => setIsSecondOpen(false)} zIndexLevel={2000} overlayColor="green">
          <h2 className="mb-4 text-2xl font-bold text-green-600">Modal Nivel 2</h2>
          <p className="mb-6 text-gray-700">Este modal tiene z-index: 2000 (aparece encima del Modal 1)</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsSecondOpen(false)} className="w-full" />
          </div>
        </Modal>

        {/* Modal 3 - Nivel alto */}
        <Modal {...args} isOpen={isThirdOpen} onClose={() => setIsThirdOpen(false)} zIndexLevel={3000} overlayColor="red">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Modal Nivel 3</h2>
          <p className="mb-6 text-gray-700">Este modal tiene z-index: 3000 (aparece encima de todos)</p>
          <div className="space-y-3">
            <Button color="primary" title="Confirmar" className="w-full" />
            <Button color="gray" title="Cancelar" onClick={() => setIsThirdOpen(false)} className="w-full" />
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    overlayColor: "blue",
  },
};
