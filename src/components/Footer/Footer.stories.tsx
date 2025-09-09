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
    showVersionInfo: {
      control: "boolean",
      description: "Mostrar información de versión con tooltip",
    },
    isDevelopment: {
      control: "boolean",
      description: "Mostrar banner de versión en desarrollo",
    },
    version: {
      control: "text",
      description: "Versión del sistema",
    },
    developVersion: {
      control: "text",
      description: "Versión de desarrollo",
    },
    currentPath: {
      control: "text",
      description: "Ruta actual para determinar visibilidad",
    },
    hideOnPaths: {
      control: "object",
      description: "Rutas donde ocultar el footer",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    showBrowserInfo: true,
    showContactInfo: true,
    showVersionInfo: true,
    isDevelopment: false,
    version: "1.0.0",
    developVersion: "1.0.0-dev",
    currentPath: "/",
    hideOnPaths: ["/vote/resume", "/vote/candidates"],
  },
};

export const HomePage: Story = {
  args: {
    ...Default.args,
    currentPath: "/",
  },
};

export const VotePage: Story = {
  args: {
    ...Default.args,
    currentPath: "/vote/resume",
  },
};

export const AnyPage: Story = {
  args: {
    ...Default.args,
    currentPath: "/any-page",
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

export const WithoutVersionInfo: Story = {
  args: {
    ...Default.args,
    showVersionInfo: false,
  },
};

export const CustomContent: Story = {
  args: {
    ...Default.args,
    customContent: (
      <div className="bg-gray-800 text-white p-8 text-center">
        <h3 className="text-xl font-bold mb-4">Footer Personalizado</h3>
        <p>Contenido personalizado del footer</p>
      </div>
    ),
  },
};
