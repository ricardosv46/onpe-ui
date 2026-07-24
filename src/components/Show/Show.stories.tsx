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
      <div className="oui:p-6 oui:bg-gray-100 oui:rounded oui:text-center oui:text-gray-600">
        Cargando...
      </div>
    ),
    children: (
      <div className="oui:p-6 oui:bg-green-100 oui:rounded oui:text-center oui:text-green-700 oui:font-semibold">
        Contenido cargado correctamente
      </div>
    ),
  },
};

export const ContenidoCargado: Story = {
  args: {
    condition: false,
    loadingComponent: (
      <div className="oui:p-6 oui:bg-gray-100 oui:rounded oui:text-center oui:text-gray-600">
        Cargando...
      </div>
    ),
    children: (
      <div className="oui:p-6 oui:bg-green-100 oui:rounded oui:text-center oui:text-green-700 oui:font-semibold">
        Contenido cargado correctamente
      </div>
    ),
  },
};
