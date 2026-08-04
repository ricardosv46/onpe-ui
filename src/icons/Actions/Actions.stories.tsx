import type { Meta, StoryObj } from "@storybook/react";
import { IconCheck } from "./IconCheck";
import { IconClose } from "./IconClose";
import { IconCloseRadius } from "./IconCloseRadius";
import { IconHome } from "./IconHome";
import { IconInfo } from "./IconInfo";
import { IconPhone } from "./IconPhone";
import { IconSpinnerDesktop } from "./IconSpinnerDesktop";
import { IconSpinnerMobile } from "./IconSpinnerMobile";
import { IconWarning } from "./IconWarning";
import { IconWarningNotRecommended } from "./IconWarningNotRecommended";

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
    <div className="oui:grid oui:grid-cols-3 sm:oui:grid-cols-5 oui:gap-8 oui:p-6">
      {[
        { icon: <IconCheck className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconCheck" },
        { icon: <IconClose className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconClose" },
        { icon: <IconCloseRadius className="oui:w-10 oui:h-10 oui:text-onpe-red" />, name: "IconCloseRadius" },
        { icon: <IconHome className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconHome" },
        { icon: <IconInfo className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconInfo" },
        { icon: <IconPhone className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconPhone" },
        { icon: <IconSpinnerDesktop className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSpinnerDesktop" },
        { icon: <IconSpinnerMobile className="oui:w-10 oui:h-10 oui:text-onpe-blue" />, name: "IconSpinnerMobile" },
        { icon: <IconWarning className="oui:w-10 oui:h-10 oui:text-onpe-skyblue" />, name: "IconWarning" },
        { icon: <IconWarningNotRecommended className="oui:w-10 oui:h-10 oui:text-onpe-yellow" />, name: "IconWarningNotRecommended" },
      ].map(({ icon, name }) => (
        <div key={name} className="oui:flex oui:flex-col oui:items-center oui:gap-2">
          {icon}
          <span className="oui:text-xs oui:text-gray-500 oui:text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Spinner: Story = {
  render: () => (
    <div className="oui:flex oui:gap-8 oui:items-center oui:p-6">
      <div className="oui:flex oui:flex-col oui:items-center oui:gap-2">
        <IconSpinnerDesktop className="oui:w-16 oui:h-16 oui:text-onpe-blue oui:animate-spin" />
        <span className="oui:text-xs oui:text-gray-500">Desktop (animado)</span>
      </div>
      <div className="oui:flex oui:flex-col oui:items-center oui:gap-2">
        <IconSpinnerMobile className="oui:w-16 oui:h-16 oui:text-onpe-blue oui:animate-spin" />
        <span className="oui:text-xs oui:text-gray-500">Mobile (animado)</span>
      </div>
    </div>
  ),
};
