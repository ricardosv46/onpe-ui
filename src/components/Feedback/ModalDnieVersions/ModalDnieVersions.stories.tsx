import React, { useState } from "react";
import ModalDnieVersions from "./ModalDnieVersions";
import { Button } from "../../Button/Button";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalDnieVersions> = {
  title: "Components/Feedback/ModalDnieVersions",
  component: ModalDnieVersions,
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
      description: "Clases CSS adicionales para personalizar el modal",
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
            {isOpen ? "Cerrar Modal" : "Abrir Modal DNIe Versions"}
          </button>
        </div>
        <ModalDnieVersions {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {},
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">Demo Interactivo de Modal DNIe Versions</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue/80"
          >
            Abrir Modal DNIe Versions
          </button>
        </div>

        <ModalDnieVersions isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

export const WithCustomSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-green-500 rounded hover:bg-onpe-ui-green-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal DNIe Versions Grande"}
          </button>
        </div>
        <ModalDnieVersions {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} className="onpe-modal-size-xl" />
      </div>
    );
  },
  args: {},
};

export const MobileView: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="p-4 mb-4 bg-onpe-ui-gray-100 rounded">
          <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-white bg-onpe-ui-skyblue-500 rounded hover:bg-onpe-ui-skyblue-600">
            {isOpen ? "Cerrar Modal" : "Abrir Modal DNIe Versions (Móvil)"}
          </button>
          <p className="mt-2 text-sm text-gray-600">Redimensiona la ventana a menos de 640px para ver el diseño móvil</p>
        </div>
        <ModalDnieVersions {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {},
};
