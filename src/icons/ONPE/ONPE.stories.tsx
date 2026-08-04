import type { Meta, StoryObj } from "@storybook/react";
import { IconElectionsGeneral } from "./IconElectionsGeneral";
import { IconElectionsRegionalesYMunicipales } from "./IconElectionsRegionalesYMunicipales";
import { IconLogoONPE } from "./IconLogoONPE";
import { IconVotoDigital } from "./IconVotoDigital";
import { IconOnpe } from "./IconOnpe";
import { IconVenp } from "./IconVenp";

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
    <div className="oui:grid oui:grid-cols-2 sm:oui:grid-cols-4 oui:gap-8 oui:p-6">
      {[
        { icon: <IconElectionsGeneral className="oui:w-16 oui:h-16 oui:text-onpe-blue" />, name: "IconElectionsGeneral" },
        { icon: <IconElectionsRegionalesYMunicipales className="oui:w-16 oui:h-16 oui:text-onpe-blue" />, name: "IconElectionsRegionalesYMunicipales" },
        { icon: <IconLogoONPE className="oui:w-16 oui:h-16 oui:text-onpe-blue" />, name: "IconLogoONPE" },
        { icon: <IconVotoDigital className="oui:w-16 oui:h-16 oui:text-onpe-blue" />, name: "IconVotoDigital" },
      ].map(({ icon, name }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
          {icon}
          <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const LogoONPE: Story = {
  render: () => (
    <div className="oui:p-8 oui:flex oui:flex-col oui:items-center oui:gap-4">
      <IconLogoONPE className="oui:w-32 oui:h-32 oui:text-onpe-blue" />
      <p className="oui:text-sm oui:text-gray-500">Logo oficial ONPE</p>
    </div>
  ),
};


export const MigradoDesdeVENP: Story = {
  render: () => (
    <div className="oui:p-6">
      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">Migrado desde VENP (2026-08-04)</h3>
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:p-6">
        {[
          { icon: <IconOnpe className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconOnpe" },
          { icon: <IconVenp className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconVenp" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
