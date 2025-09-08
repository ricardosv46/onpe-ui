import type { Meta, StoryObj } from "@storybook/react";
import {
  IconClose,
  IconCheck,
  IconWarning,
  IconSpinnerDesktop,
  IconSpinnerMobile,
  IconHome,
  // Navegadores
  IconChromeColor,
  IconChrome,
  IconSafariColor,
  IconSafari,
  IconMozillaColor,
  IconMozilla,
  IconEdgeColor,
  IconEdge,
  // Sistemas Operativos
  IconWindow,
  IconAndroid,
  IconApple,
  // ONPE
  IconVotoDigital,
  IconElectionsGeneral,
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
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Iconos de Acciones</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconClose width={24} height={24} className="mx-auto mb-2 text-onpe-ui-red" />
            <span className="text-sm text-onpe-ui-gray-dark">IconClose</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconCheck width={24} height={24} className="mx-auto mb-2 text-onpe-ui-green" />
            <span className="text-sm text-onpe-ui-gray-dark">IconCheck</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconWarning width={24} height={24} className="mx-auto mb-2 text-onpe-ui-yellow" />
            <span className="text-sm text-onpe-ui-gray-dark">IconWarning</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSpinnerDesktop width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue animate-spin" />
            <span className="text-sm text-onpe-ui-gray-dark">IconSpinnerDesktop</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSpinnerMobile width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue animate-spin" />
            <span className="text-sm text-onpe-ui-gray-dark">IconSpinnerMobile</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconHome width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconHome</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Iconos de Navegadores</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconChrome width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconChrome</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSafari width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconSafari</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconMozilla width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconMozilla</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconEdge width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconEdge</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconChromeColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconChromeColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconSafariColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconSafariColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconMozillaColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconMozillaColor</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconEdgeColor width={24} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconEdgeColor</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Iconos de Sistemas Operativos</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconWindow width={24} height={24} className="mx-auto mb-2 text-onpe-ui-blue" />
            <span className="text-sm text-onpe-ui-gray-dark">IconWindow</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconAndroid width={24} height={24} className="mx-auto mb-2 text-onpe-ui-green" />
            <span className="text-sm text-onpe-ui-gray-dark">IconAndroid</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconApple width={24} height={24} className="mx-auto mb-2 text-onpe-ui-gray-dark" />
            <span className="text-sm text-onpe-ui-gray-dark">IconApple</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Iconos de ONPE</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconVotoDigital width={80} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconVotoDigital</span>
          </div>
          <div className="p-4 text-center border rounded-lg border-gray">
            <IconElectionsGeneral width={120} height={24} className="mx-auto mb-2" />
            <span className="text-sm text-onpe-ui-gray-dark">IconElectionsGeneral</span>
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
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Cómo usar los iconos</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-onpe-ui-gray-extra-light">
            <h4 className="mb-2 font-semibold text-onpe-ui-gray-dark">Importación:</h4>
            <code className="block p-2 text-sm bg-white border rounded">{`import { IconClose, IconCheck, IconWarning } from '@onpe/ui/icons';`}</code>
          </div>

          <div className="p-4 rounded-lg bg-onpe-ui-gray-extra-light">
            <h4 className="mb-2 font-semibold text-onpe-ui-gray-dark">Uso básico:</h4>
            <code className="block p-2 text-sm bg-white border rounded">{`<IconClose width={16} height={16} className="text-onpe-ui-red" />
<IconCheck width={16} height={16} className="text-onpe-ui-green" />
<IconWarning width={16} height={16} className="text-onpe-ui-yellow" />`}</code>
          </div>

          <div className="p-4 rounded-lg bg-onpe-ui-gray-extra-light">
            <h4 className="mb-2 font-semibold text-onpe-ui-gray-dark">En botones:</h4>
            <code className="block p-2 text-sm bg-white border rounded">
              {`<button className="p-2 text-white rounded bg-onpe-ui-red">
  <IconClose width={12} height={12} />
</button>`}
            </code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-onpe-ui-blue">Ejemplo práctico</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <button className="p-2 text-white transition-colors rounded-full bg-onpe-ui-red hover:bg-onpe-ui-red/80">
              <IconClose width={12} height={12} />
            </button>
            <span className="text-onpe-ui-gray-dark">Botón de cerrar</span>
          </div>
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <button className="p-2 text-white transition-colors rounded-full bg-onpe-ui-green hover:bg-onpe-ui-green/80">
              <IconCheck width={12} height={12} />
            </button>
            <span className="text-onpe-ui-gray-dark">Botón de confirmar</span>
          </div>
          <div className="flex items-center p-4 space-x-4 border rounded-lg border-gray">
            <div className="p-2 text-onpe-ui-yellow">
              <IconWarning width={16} height={16} />
            </div>
            <span className="text-onpe-ui-gray-dark">Icono de advertencia</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
