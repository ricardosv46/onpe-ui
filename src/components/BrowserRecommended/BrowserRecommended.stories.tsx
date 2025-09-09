import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRecommended } from "./BrowserRecommended";

const meta: Meta<typeof BrowserRecommended> = {
  title: "Components/BrowserRecommended",
  component: BrowserRecommended,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    showLabels: {
      control: "boolean",
      description: "Mostrar etiquetas de los navegadores",
    },
    title: {
      control: "text",
      description: "Título de la sección",
    },
    className: {
      control: "text",
      description: "Clases CSS adicionales",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrowserRecommended>;

export const Default: Story = {
  args: {
    showLabels: true,
    title: "Navegadores recomendados:",
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
    title: "Navegadores recomendados:",
  },
};

export const CustomTitle: Story = {
  args: {
    showLabels: true,
    title: "Navegadores compatibles:",
  },
};

export const Compact: Story = {
  args: {
    showLabels: false,
    title: "Navegadores:",
    className: "py-2",
  },
};
