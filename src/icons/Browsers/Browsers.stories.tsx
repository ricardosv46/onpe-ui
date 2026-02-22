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
    <div className="p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Monocromos</h3>
      <div className="grid grid-cols-4 gap-8 mb-8">
        {[
          { icon: <IconChrome className="w-10 h-10 text-onpe-blue" />, name: "IconChrome" },
          { icon: <IconEdge className="w-10 h-10 text-onpe-blue" />, name: "IconEdge" },
          { icon: <IconMozilla className="w-10 h-10 text-onpe-blue" />, name: "IconMozilla" },
          { icon: <IconSafari className="w-10 h-10 text-onpe-blue" />, name: "IconSafari" },
        ].map(({ icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            {icon}
            <span className="text-xs text-gray-500 text-center">{name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-gray-700 mb-4">A color</h3>
      <div className="grid grid-cols-4 gap-8">
        {[
          { icon: <IconChromeColor className="w-10 h-10" />, name: "IconChromeColor" },
          { icon: <IconEdgeColor className="w-10 h-10" />, name: "IconEdgeColor" },
          { icon: <IconMozillaColor className="w-10 h-10" />, name: "IconMozillaColor" },
          { icon: <IconSafariColor className="w-10 h-10" />, name: "IconSafariColor" },
        ].map(({ icon, name }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            {icon}
            <span className="text-xs text-gray-500 text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
