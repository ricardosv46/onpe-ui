import type { Meta, StoryObj } from "@storybook/react";
import {
  IconClose,
  IconCheck,
  IconWarning,
  IconSpinnerDesktop,
  IconSpinnerMobile,
  IconChromeColor,
  IconSafariColor,
  IconMozillaColor,
  IconEdgeColor,
  IconWindow,
  IconAndroid,
  IconApple,
} from "./index";

const meta: Meta = {
  title: "Icons/Overview",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionsIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-blue">Iconos de Acciones</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconClose width={24} height={24} className="mx-auto mb-2 text-red" />
            <span className="text-sm text-gray-dark">IconClose</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconCheck width={24} height={24} className="mx-auto mb-2 text-green" />
            <span className="text-sm text-gray-dark">IconCheck</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconWarning width={24} height={24} className="mx-auto mb-2 text-yellow" />
            <span className="text-sm text-gray-dark">IconWarning</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSpinnerDesktop width={24} height={24} className="mx-auto mb-2 text-blue animate-spin" />
            <span className="text-sm text-gray-dark">IconSpinnerDesktop</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSpinnerMobile width={24} height={24} className="mx-auto mb-2 text-blue animate-spin" />
            <span className="text-sm text-gray-dark">IconSpinnerMobile</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-blue">Iconos de Logos</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconChromeColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-gray-dark">IconChromeColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSafariColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-gray-dark">IconSafariColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconMozillaColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-gray-dark">IconMozillaColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconEdgeColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-gray-dark">IconEdgeColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconWindow width={24} height={24} className="mx-auto mb-2 text-blue" />
            <span className="text-sm text-gray-dark">IconWindow</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconAndroid width={24} height={24} className="mx-auto mb-2 text-green" />
            <span className="text-sm text-gray-dark">IconAndroid</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconApple width={24} height={24} className="mx-auto mb-2 text-gray-dark" />
            <span className="text-sm text-gray-dark">IconApple</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IconUsage: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-blue">Cómo usar los iconos</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-extra-light">
            <h4 className="mb-2 font-semibold text-gray-dark">Importación:</h4>
            <code className="block p-2 text-sm bg-white border rounded">{`import { IconClose, IconCheck, IconWarning } from '@onpe/ui/icons';`}</code>
          </div>

          <div className="p-4 rounded-lg bg-gray-extra-light">
            <h4 className="mb-2 font-semibold text-gray-dark">Uso básico:</h4>
            <code className="block p-2 text-sm bg-white border rounded">{`<IconClose width={16} height={16} className="text-red" />
<IconCheck width={16} height={16} className="text-green" />
<IconWarning width={16} height={16} className="text-yellow" />`}</code>
          </div>

          <div className="p-4 rounded-lg bg-gray-extra-light">
            <h4 className="mb-2 font-semibold text-gray-dark">En botones:</h4>
            <code className="block p-2 text-sm bg-white border rounded">
              {`<button className="p-2 text-white rounded bg-red">
  <IconClose width={12} height={12} />
</button>`}
            </code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-blue">Ejemplo práctico</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <button className="p-2 text-white transition-colors rounded-full bg-red hover:bg-red/80">
              <IconClose width={12} height={12} />
            </button>
            <span className="text-gray-dark">Botón de cerrar</span>
          </div>
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <button className="p-2 text-white transition-colors rounded-full bg-green hover:bg-green/80">
              <IconCheck width={12} height={12} />
            </button>
            <span className="text-gray-dark">Botón de confirmar</span>
          </div>
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <div className="p-2 text-yellow">
              <IconWarning width={16} height={16} />
            </div>
            <span className="text-gray-dark">Icono de advertencia</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
