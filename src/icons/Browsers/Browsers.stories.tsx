import type { Meta, StoryObj } from "@storybook/react";
import { IconChrome } from "./IconChrome";
import { IconChromeColor } from "./IconChromeColor";
import { IconEdge } from "./IconEdge";
import { IconEdgeColor } from "./IconEdgeColor";
import { IconMozilla } from "./IconMozilla";
import { IconMozillaColor } from "./IconMozillaColor";
import { IconSafari } from "./IconSafari";
import { IconSafariColor } from "./IconSafariColor";

const meta: Meta = {
  title: "Icons/Browsers",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="oui:p-6">
      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">Monocromos</h3>
      <div className="oui:grid oui:grid-cols-4 oui:gap-8 oui:mb-8">
        {[
          { icon: <IconChrome className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconChrome" },
          { icon: <IconEdge className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconEdge" },
          { icon: <IconMozilla className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconMozilla" },
          { icon: <IconSafari className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSafari" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-center oui:text-gray-500">{name}</span>
          </div>
        ))}
      </div>

      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">A color</h3>
      <div className="oui:grid oui:grid-cols-4 oui:gap-8">
        {[
          { icon: <IconChromeColor className="oui:w-10 oui:h-10" />, name: "IconChromeColor" },
          { icon: <IconEdgeColor className="oui:w-10 oui:h-10" />, name: "IconEdgeColor" },
          { icon: <IconMozillaColor className="oui:w-10 oui:h-10" />, name: "IconMozillaColor" },
          { icon: <IconSafariColor className="oui:w-10 oui:h-10" />, name: "IconSafariColor" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-center oui:text-gray-500">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
