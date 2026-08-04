import type { Meta, StoryObj } from "@storybook/react";
import { IconClose } from "./IconClose";
import { IconCloseRadius } from "./IconCloseRadius";
import { IconRemove } from "./IconRemove";
import { IconArrowDown } from "./IconArrowDown";
import { IconHome } from "./IconHome";
import { IconShowPassword } from "./IconShowPassword";
import { IconShowPasswordSlash } from "./IconShowPasswordSlash";
import { IconAdd } from "./IconAdd";
import { IconAttach } from "./IconAttach";
import { IconDelete } from "./IconDelete";
import { IconEdit } from "./IconEdit";
import { IconEraser } from "./IconEraser";
import { IconHash } from "./IconHash";
import { IconPassword } from "./IconPassword";
import { IconResend } from "./IconResend";
import { IconReload } from "./IconReload";

const meta: Meta = {
  title: "Icons/Actions",
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
      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">
        Cerrar / Quitar (misma idea, distinto peso y estilo)
      </h3>
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:mb-8">
        {[
          { icon: <IconClose className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconClose" },
          { icon: <IconCloseRadius className="oui:w-10 oui:h-10 oui:text-onpe-red" />, name: "IconCloseRadius" },
          { icon: <IconRemove className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconRemove" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>

      <h3 className="oui:mb-4 oui:text-sm oui:font-semibold oui:text-gray-700">Otras acciones</h3>
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8">
        {[
          { icon: <IconArrowDown className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconArrowDown" },
          { icon: <IconHome className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconHome" },
          { icon: <IconShowPassword className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconShowPassword" },
          { icon: <IconShowPasswordSlash className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconShowPasswordSlash" },
          { icon: <IconAdd className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconAdd" },
          { icon: <IconAttach className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconAttach" },
          { icon: <IconDelete className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconDelete" },
          { icon: <IconEdit className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconEdit" },
          { icon: <IconEraser className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconEraser" },
          { icon: <IconHash className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconHash" },
          { icon: <IconPassword className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconPassword" },
          { icon: <IconResend className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconResend" },
          { icon: <IconReload className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconReload" },
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
