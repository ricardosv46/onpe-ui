import type { Meta, StoryObj } from "@storybook/react";
import { IconMail } from "./IconMail";
import { IconPhone } from "./IconPhone";
import { IconPhoneOutline } from "./IconPhoneOutline";
import { IconUbicacion } from "./IconUbicacion";

const meta: Meta = {
  title: "Icons/Contact",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = {
  render: () => (
      <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:p-6">
        {[
          { icon: <IconMail className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconMail" },
          { icon: <IconPhone className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconPhone" },
          { icon: <IconPhoneOutline className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconPhoneOutline" },
          { icon: <IconUbicacion className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconUbicacion" },
        ].map(({ icon, name }) => (
          <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
            {icon}
            <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
          </div>
        ))}
      </div>
  ),
};
