import type { Meta, StoryObj } from "@storybook/react";
import { Show } from "./Show";

const meta: Meta<typeof Show> = {
  title: "Components/Show",
  component: Show,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EnCarga: Story = {
  args: {
    condition: true,
    loadingComponent: (
      <div className="p-6 bg-gray-100 rounded text-center text-gray-600">
        Cargando...
      </div>
    ),
    children: (
      <div className="p-6 bg-green-100 rounded text-center text-green-700 font-semibold">
        Contenido cargado correctamente
      </div>
    ),
  },
};

export const ContenidoCargado: Story = {
  args: {
    condition: false,
    loadingComponent: (
      <div className="p-6 bg-gray-100 rounded text-center text-gray-600">
        Cargando...
      </div>
    ),
    children: (
      <div className="p-6 bg-green-100 rounded text-center text-green-700 font-semibold">
        Contenido cargado correctamente
      </div>
    ),
  },
};
