import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    showBrowserInfo: {
      control: "boolean",
      description: "Mostrar información de navegadores recomendados",
    },
    showContactInfo: {
      control: "boolean",
      description: "Mostrar información de contacto de ONPE",
    },
    children: {
      control: "text",
      description: "Contenido personalizado para renderizar en el footer",
    },
    isDevelopment: {
      control: "boolean",
      description: "Mostrar banner de versión en desarrollo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    showBrowserInfo: true,
    showContactInfo: true,
    children: undefined,
    isDevelopment: false,
  },
};

export const HomePage: Story = {
  args: {
    ...Default.args,
  },
};

export const VotePage: Story = {
  args: {
    ...Default.args,
  },
};

export const AnyPage: Story = {
  args: {
    ...Default.args,
  },
};

export const DevelopmentMode: Story = {
  args: {
    ...Default.args,
    isDevelopment: true,
  },
};

export const WithoutBrowserInfo: Story = {
  args: {
    ...Default.args,
    showBrowserInfo: false,
  },
};

export const WithoutContactInfo: Story = {
  args: {
    ...Default.args,
    showContactInfo: false,
  },
};

export const WithoutChildren: Story = {
  args: {
    ...Default.args,
    children: undefined,
  },
};

export const CustomContent: Story = {
  args: {
    ...Default.args,
    children: (
      <div className="p-8 text-center text-white bg-gray-800">
        <h3 className="mb-4 text-xl font-bold">Footer Personalizado</h3>
        <p>Contenido personalizado del footer</p>
      </div>
    ),
  },
};
