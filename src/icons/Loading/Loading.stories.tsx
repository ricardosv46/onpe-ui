import type { Meta, StoryObj } from "@storybook/react";
import { IconSpinnerDesktop } from "./IconSpinnerDesktop";
import { IconSpinnerMobile } from "./IconSpinnerMobile";
import { IconLoadingSpin } from "./IconLoadingSpin";

const meta: Meta = {
  title: "Icons/Loading",
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
        { icon: <IconSpinnerDesktop className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSpinnerDesktop" },
        { icon: <IconSpinnerMobile className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSpinnerMobile" },
        { icon: <IconLoadingSpin className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconLoadingSpin" },
      ].map(({ icon, name }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
          {icon}
          <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Animados: Story = {
  render: () => (
    <div className="oui:flex oui:gap-8 oui:items-center oui:p-6">
      <div className="oui:flex oui:flex-col oui:items-center oui:gap-2">
        <IconSpinnerDesktop className="oui:w-16 oui:h-16 oui:text-onpe-blue oui:animate-spin" />
        <span className="oui:text-xs oui:text-gray-500">Desktop</span>
      </div>
      <div className="oui:flex oui:flex-col oui:items-center oui:gap-2">
        <IconSpinnerMobile className="oui:w-16 oui:h-16 oui:text-onpe-blue oui:animate-spin" />
        <span className="oui:text-xs oui:text-gray-500">Mobile</span>
      </div>
      <div className="oui:flex oui:flex-col oui:items-center oui:gap-2">
        <IconLoadingSpin className="oui:w-16 oui:h-16 oui:text-onpe-blue oui:animate-spin" />
        <span className="oui:text-xs oui:text-gray-500">LoadingSpin</span>
      </div>
    </div>
  ),
};
