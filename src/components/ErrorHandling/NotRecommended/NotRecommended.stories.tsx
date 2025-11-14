import React, { useState } from "react";
import { NotRecommended } from "./NotRecommended";

// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotRecommended> = {
  title: "ErrorHandling/NotRecommended",
  component: NotRecommended,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpenBrowserError: {
      control: { type: "boolean" },
      description: "Indica si hay un error de navegador no recomendado",
    },
    isOpenDeviceError: {
      control: { type: "boolean" },
      description: "Indica si hay un error de sistema operativo no recomendado",
    },
    bottom: {
      control: { type: "text" },
      description:
        "Distancia desde el bottom en px, rem, % o cualquier unidad CSS válida. Por defecto: 40px",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BrowserError: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: false,
  },
};

export const DeviceError: Story = {
  args: {
    isOpenBrowserError: false,
    isOpenDeviceError: true,
  },
};

export const NoError: Story = {
  args: {
    isOpenBrowserError: false,
    isOpenDeviceError: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpenBrowserError, setIsOpenBrowserError] = useState(false);
    const [isOpenDeviceError, setIsOpenDeviceError] = useState(false);

    return (
      <div className="min-h-screen p-8 bg-onpe-ui-gray-extra-light">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-onpe-ui-blue">
            Demo NotRecommended
          </h2>
          <p className="mb-6 text-onpe-ui-gray-dark">
            Prueba diferentes estados del componente de advertencia.
          </p>

          <div className="space-y-4">
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-onpe-ui-gray-dark">
                <input
                  type="checkbox"
                  checked={isOpenBrowserError}
                  onChange={(e) => setIsOpenBrowserError(e.target.checked)}
                  className="mr-2"
                />
                Error de Navegador
              </label>
            </div>

            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-onpe-ui-gray-dark">
                <input
                  type="checkbox"
                  checked={isOpenDeviceError}
                  onChange={(e) => setIsOpenDeviceError(e.target.checked)}
                  className="mr-2"
                />
                Error de Sistema Operativo
              </label>
            </div>
          </div>
        </div>

        <NotRecommended
          isOpenBrowserError={isOpenBrowserError}
          isOpenDeviceError={isOpenDeviceError}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const Default: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: false,
  },
};

export const CustomBottom: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: false,
    bottom: 80, // 80px desde el bottom
  },
};

export const CustomBottomWithUnit: Story = {
  args: {
    isOpenBrowserError: true,
    isOpenDeviceError: false,
    bottom: "5rem", // Con unidad CSS personalizada
  },
};
