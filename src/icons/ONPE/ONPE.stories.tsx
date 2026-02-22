import type { Meta, StoryObj } from "@storybook/react";
import { IconElectionsGeneral } from "./IconElectionsGeneral";
import { IconElectionsRegionalesYMunicipales } from "./IconElectionsRegionalesYMunicipales";
import { IconLogoONPE } from "./IconLogoONPE";
import { IconVotoDigital } from "./IconVotoDigital";

const meta: Meta = {
  title: "Icons/ONPE",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 p-6">
      {[
        { icon: <IconElectionsGeneral className="w-16 h-16 text-onpe-blue" />, name: "IconElectionsGeneral" },
        { icon: <IconElectionsRegionalesYMunicipales className="w-16 h-16 text-onpe-blue" />, name: "IconElectionsRegionalesYMunicipales" },
        { icon: <IconLogoONPE className="w-16 h-16 text-onpe-blue" />, name: "IconLogoONPE" },
        { icon: <IconVotoDigital className="w-16 h-16 text-onpe-blue" />, name: "IconVotoDigital" },
      ].map(({ icon, name }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          {icon}
          <span className="text-xs text-gray-500 text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const LogoONPE: Story = {
  render: () => (
    <div className="p-8 flex flex-col items-center gap-4">
      <IconLogoONPE className="w-32 h-32 text-onpe-blue" />
      <p className="text-sm text-gray-500">Logo oficial ONPE</p>
    </div>
  ),
};
