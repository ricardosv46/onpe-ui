import type { Meta, StoryObj } from "@storybook/react";
import Overlay from "./Overlay";
import React, { useState } from "react";

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: { type: "boolean" },
    },
    color: {
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

export const Blue: Story = {
  args: {
    show: true,
    color: "blue",
  },
};

export const Skyblue: Story = {
  args: {
    show: true,
    color: "skyblue",
  },
};

export const Red: Story = {
  args: {
    show: true,
    color: "red",
  },
};

export const Green: Story = {
  args: {
    show: true,
    color: "green",
  },
};

export const Yellow: Story = {
  args: {
    show: true,
    color: "yellow",
  },
};

export const Gray: Story = {
  args: {
    show: true,
    color: "gray",
  },
};

export const Interactive: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedColor, setSelectedColor] = useState<"blue" | "skyblue" | "red" | "green" | "yellow">("blue");

    const colors = [
      { name: "blue", label: "Azul" },
      { name: "skyblue", label: "Skyblue" },
      { name: "red", label: "Rojo" },
      { name: "green", label: "Verde" },
      { name: "yellow", label: "Amarillo" },
    ] as const;

    return (
      <div className="relative min-h-screen bg-onpe-ui-gray-extra-light p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-onpe-ui-blue mb-4">Demo de Overlay</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-onpe-ui-gray-dark mb-2">Color del overlay:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value as any)}
                className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-blue"
              >
                {colors.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                showOverlay ? "bg-onpe-ui-red text-white hover:bg-onpe-ui-red/80" : "bg-onpe-ui-blue text-white hover:bg-onpe-ui-blue/80"
              }`}
            >
              {showOverlay ? "Ocultar Overlay" : "Mostrar Overlay"}
            </button>
          </div>

          <div className="mt-6 p-4 bg-onpe-ui-gray-extra-light rounded">
            <p className="text-sm text-onpe-ui-gray-dark">Contenido de ejemplo que se ve detrás del overlay.</p>
          </div>
        </div>

        <Overlay show={showOverlay} color={selectedColor} onClick={() => setShowOverlay(false)} />
      </div>
    );
  },
};

export const AllColors: Story = {
  render: () => {
    const colors = [
      { name: "blue", label: "Azul" },
      { name: "skyblue", label: "Skyblue" },
      { name: "skyblue-light", label: "Skyblue Light" },
      { name: "yellow", label: "Amarillo" },
      { name: "light-skyblue", label: "Light Skyblue" },
      { name: "gray", label: "Gris" },
      { name: "gray-light", label: "Gris Light" },
      { name: "gray-extra-light", label: "Gris Extra Light" },
      { name: "red", label: "Rojo" },
      { name: "dark-gray", label: "Gris Oscuro" },
      { name: "green", label: "Verde" },
      { name: "yellow-light", label: "Amarillo Light" },
      { name: "primary", label: "Primario" },
    ] as const;

    return (
      <div className="relative min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-onpe-ui-blue mb-6">Galería de Colores de Overlay</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="relative">
                <div className="bg-white border border-gray rounded-lg p-4 shadow">
                  <h3 className="font-semibold text-onpe-ui-gray-dark mb-2">{color.label}</h3>
                  <div className="h-20 rounded bg-onpe-ui-gray-extra-light flex items-center justify-center">
                    <span className="text-sm text-onpe-ui-gray">Contenido de ejemplo</span>
                  </div>
                </div>
                <Overlay show={true} color={color.name} onClick={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
