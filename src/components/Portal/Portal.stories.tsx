import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Portal from "./Portal";

const meta: Meta<typeof Portal> = {
  title: "Components/Portal",
  component: Portal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h3 className="text-lg font-semibold text-onpe-ui-blue">Contenido en Portal</h3>
        <p className="text-onpe-ui-gray-dark mt-2">Este contenido se renderiza en un portal DOM separado.</p>
      </div>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <div className="bg-onpe-ui-skyblue text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-3">Portal con Botón</h3>
        <button className="bg-white text-onpe-ui-skyblue px-4 py-2 rounded font-semibold hover:bg-onpe-ui-gray-extra-light transition-colors">
          Botón en Portal
        </button>
      </div>
    ),
  },
};

export const MultipleElements: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div className="bg-onpe-ui-red text-white p-4 rounded">
          <h4 className="font-semibold">Elemento 1</h4>
          <p>Primer elemento en el portal</p>
        </div>
        <div className="bg-onpe-ui-green text-white p-4 rounded">
          <h4 className="font-semibold">Elemento 2</h4>
          <p>Segundo elemento en el portal</p>
        </div>
        <div className="bg-onpe-ui-yellow text-onpe-ui-blue p-4 rounded">
          <h4 className="font-semibold">Elemento 3</h4>
          <p>Tercer elemento en el portal</p>
        </div>
      </div>
    ),
  },
};

export const PortalInfo: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="bg-onpe-ui-blue text-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">¿Cómo funciona el Portal?</h3>
        <p className="text-sm">
          El Portal renderiza contenido fuera del árbol DOM normal. En Storybook se renderiza en document.body ya que no hay elemento #portal
          disponible.
        </p>
      </div>

      <div className="bg-onpe-ui-gray-extra-light p-4 rounded-lg">
        <h4 className="font-semibold text-onpe-ui-gray-dark mb-2">Para usar en tu aplicación:</h4>
        <ol className="text-sm text-onpe-ui-gray-dark space-y-1 list-decimal list-inside">
          <li>
            Agrega <code className="bg-white px-1 rounded">&lt;div id="portal"&gt;&lt;/div&gt;</code> en tu HTML
          </li>
          <li>El Portal automáticamente encontrará y usará ese elemento</li>
          <li>Si no existe, usará document.body como fallback</li>
        </ol>
      </div>

      <Portal>
        <div className="bg-onpe-ui-green text-white p-4 rounded-lg shadow-lg">
          <h4 className="font-semibold">¡Este contenido está en el Portal!</h4>
          <p className="text-sm">Se renderiza fuera del flujo normal del DOM.</p>
        </div>
      </Portal>
    </div>
  ),
};
