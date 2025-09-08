import type { Meta, StoryObj } from "@storybook/react";
import Show from "./Show";
import React, { useState } from "react";

const meta: Meta<typeof Show> = {
  title: "Components/Show",
  component: Show,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    condition: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    condition: true,
    loadingComponent: (
      <div className="flex items-center p-4 space-x-3 bg-white rounded-lg shadow">
        <div className="w-6 h-6 border-b-2 rounded-full animate-spin border-blue"></div>
        <span className="font-medium text-onpe-ui-blue">Cargando...</span>
      </div>
    ),
    children: (
      <div className="p-4 text-white rounded-lg bg-onpe-ui-green">
        <h3 className="font-semibold">Contenido cargado</h3>
        <p>Este contenido se muestra cuando no está cargando</p>
      </div>
    ),
  },
};

export const Content: Story = {
  args: {
    condition: false,
    loadingComponent: (
      <div className="flex items-center p-4 space-x-3 bg-white rounded-lg shadow">
        <div className="w-6 h-6 border-b-2 rounded-full animate-spin border-blue"></div>
        <span className="font-medium text-onpe-ui-blue">Cargando...</span>
      </div>
    ),
    children: (
      <div className="p-4 text-white rounded-lg bg-onpe-ui-green">
        <h3 className="font-semibold">Contenido cargado</h3>
        <p>Este contenido se muestra cuando no está cargando</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsLoading(!isLoading)}
          className="px-4 py-2 font-semibold text-white transition-colors rounded bg-onpe-ui-blue hover:bg-onpe-ui-blue/80"
        >
          {isLoading ? "Mostrar contenido" : "Mostrar loading"}
        </button>

        <Show
          condition={isLoading}
          loadingComponent={
            <div className="flex items-center p-6 space-x-3 bg-white border rounded-lg shadow-lg">
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-skyblue"></div>
              <div>
                <h4 className="font-semibold text-onpe-ui-skyblue">Procesando datos...</h4>
                <p className="text-sm text-onpe-ui-gray-dark">Por favor espera un momento</p>
              </div>
            </div>
          }
          children={
            <div className="p-6 text-white rounded-lg shadow-lg bg-onpe-ui-skyblue">
              <h3 className="mb-2 text-xl font-bold">¡Datos cargados!</h3>
              <p className="mb-4">Los datos se han cargado exitosamente.</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-white/20">
                  <strong>Usuarios:</strong> 1,234
                </div>
                <div className="p-3 rounded bg-white/20">
                  <strong>Ventas:</strong> $45,678
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  },
};
